import "bootstrap";
import { Modal } from 'bootstrap';
import axios, {AxiosResponse} from 'axios';
import { TDashboardSurveyItem } from "../../../types/dashboard/survey.type";
import { IFolder } from "../../../interfaces/folder.interface";
import folderComponent from "./components/folder.component";
import surveyComponent from "./components/survey.component";

let pageData: { surveys: TDashboardSurveyItem[] ,folders: IFolder[] } = {
    surveys : [],
    folders : []
};

const deleteModalObj = document.getElementById('myModal')!;
const deleteModal = new Modal(deleteModalObj);

document.addEventListener("DOMContentLoaded", function(event) { 
    
    axios.get('/dashboard/folders.json')
        .then((response: AxiosResponse) => {
            pageData.folders = response.data.folders;
            fillFolders(pageData.folders);
        });

    axios.get('/dashboard/surveys.json')
        .then((response: AxiosResponse) => {
            pageData.surveys = response.data.surveys;
            fillSurveys(pageData.surveys);
        });    
});

const fillFolders = (folders: IFolder[]): void => {

    const foldersObj = document.getElementById('folders');
    const docFragment = document.createDocumentFragment();
    
    if( foldersObj ) {
        foldersObj.innerHTML = '';
        folders.forEach((folder) => {
            const li = document.createElement('li');
            li.innerHTML = folderComponent(folder);
            docFragment.appendChild(li);
        });
        foldersObj.appendChild(docFragment);
        setEventsFolders(foldersObj);
    }
}

const setEventsFolders = (foldersObj: HTMLElement): void => {

    const showAllSurveysEl = document.getElementsByClassName("show-surveys");
    if (showAllSurveysEl[0] instanceof HTMLElement) {
        showAllSurveysEl[0].addEventListener("click", e => {

            document.getElementsByClassName('showSurveysInFolder active-folder')[0]?.classList.remove('active-folder');

            pageData.surveys.map(survey => {
                const surveyObj: HTMLElement = document.querySelector(`[data-id='${survey.id}']`)!;
                if( surveyObj ) {
                    surveyObj.classList.remove('d-none');
                }
            });
        });
    }

    const folders = foldersObj.getElementsByTagName("a");
    for (var i = 0; i < folders.length; i++) {
        folders[i]?.addEventListener("click", e => {
            
            if (e.target instanceof HTMLElement && e.target.className === 'showSurveysInFolder') {

                document.getElementsByClassName('active-folder')[0]?.classList.remove('active-folder');
            
                e.target.classList.add('active-folder');

                const folderId = e.target.getAttribute('data-id');
                const surveysToShow = pageData.surveys.filter(survey => survey.organizationId === folderId);
                pageData.surveys.map(survey => {
                    const surveyObj: HTMLElement = document.querySelector(`[data-id='${survey.id}']`)!;
                    if( surveyObj ) {
                        surveyObj.classList.add('d-none');
                    }
                });
                surveysToShow.map(survey => {
                    const surveyObj: HTMLElement = document.querySelector(`[data-id='${survey.id}']`)!;
                    if( surveyObj ) {
                        surveyObj.classList.remove('d-none');
                    }
                });
            }
        });
    }

    const foldersDeleteIcons = foldersObj.getElementsByClassName("delete-it");
    for (var i = 0; i < foldersDeleteIcons.length; i++) {
        foldersDeleteIcons[i]?.addEventListener("click", e => {
            
            if( e.target instanceof HTMLElement ) {
                const folderWrapper = e.target.closest('a');
                if( folderWrapper ) {
                    const folder = pageData.folders.find(folder => folder.id === folderWrapper.getAttribute('data-id'));
                    if( folder ) {
                        const deleteNameObj = document.getElementById('deleteFolderName');
                        const deleteIddObj = document.getElementById('deleteFolderConfirm');
                        if( deleteNameObj instanceof HTMLElement && deleteIddObj instanceof HTMLElement ) {
                            deleteNameObj.innerHTML = folder.name;
                            deleteIddObj.setAttribute('data-id', folder.id);
                            deleteModal.show();
                        }
                    }
                }
            }
        });
    }

    const folderDeleteModalBtn = document.getElementById('deleteFolderConfirm');
    folderDeleteModalBtn?.addEventListener("click", e => {
        const folderId = folderDeleteModalBtn.getAttribute('data-id');
        axios.delete(`/dashboard/folder/${folderId}.json`)
            .then((response: AxiosResponse) => {
                if( response.data.res === 1 ) { 
                    pageData.folders = pageData.folders.filter(folder => folder.id !== folderId );
                    const folderObj = document.querySelector(`a.showSurveysInFolder[data-id="${folderId}"]`);
                    const folderWrapper = folderObj?.parentElement;
                    if( folderWrapper instanceof HTMLElement ) {
                        folderWrapper.remove();
                        deleteModal.hide();
                    }
                }
            });
    });

    const sortLinks = document.getElementsByClassName('sort-link');
    for (var i = 0; i < sortLinks.length; i++) {
        sortLinks[i]?.addEventListener("click", e => {
            
            document.getElementsByClassName('sort-link active')[0]?.classList.remove('active');

            if( e.target instanceof HTMLElement ) {
                const sortType = e.target.getAttribute('data-type');
                if( sortType === 'date' ) {
                    pageData.surveys.sort((a,b) => { 
                        return Math.floor(new Date(b.createdAt).getTime() / 1000) - Math.floor(new Date(a.createdAt).getTime() / 1000);
                    });
                }
                else if( sortType === 'title' ) {
                    pageData.surveys.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
                }
                else if( sortType === 'totalResponses' ) {
                    pageData.surveys.sort((a,b) => b.amountOfResponses - a.amountOfResponses);
                }
                const surveys = document.getElementsByClassName('survey-item');
                for (var i = 0; i < surveys.length; i++) {
                    const surveyEl = surveys[i];
                    if( surveyEl instanceof HTMLElement ) {
                        const replacementSurvey = pageData.surveys[i];
                        const replacementEl = document.querySelector(`[data-id="${replacementSurvey.id}"]`)!;

                        surveyEl.parentNode?.insertBefore(replacementEl, surveyEl);
                    }
                }
                e.target.classList.add('active');
            }
        });
    }
}

const fillSurveys = (surveys: TDashboardSurveyItem[]): void => {

    const surveysObj = document.getElementById('results');
    const docFragment = document.createDocumentFragment();

    if( surveysObj ) {
        surveysObj.innerHTML = '';
        surveys.forEach((survey) => {
            const div = document.createElement('div');
            div.className = 'col-md-12 col-lg-6 col-xl-4 survey-item';
            div.setAttribute('data-id', survey.id);
            div.innerHTML = surveyComponent(survey);
            docFragment.appendChild(div);
        });
        surveysObj.appendChild(docFragment);
        setEventsSurveys(pageData.surveys);
    }
}

const setEventsSurveys = (surveys: TDashboardSurveyItem[]): void => {

}