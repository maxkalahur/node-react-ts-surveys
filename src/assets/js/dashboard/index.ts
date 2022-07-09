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
            setEventsSurveys(pageData.surveys);
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
            pageData.surveys.map(survey => {
                const surveyObj: HTMLElement = document.querySelector(`[data-id='${survey.id}']`)!;
                if( surveyObj ) {
                    surveyObj.classList.remove('d-none');
                }
            });
        }
    }

    const folders = foldersObj.getElementsByTagName("a");
    
    for (var i = 0; i < folders.length; i++) {
        folders[i]?.addEventListener("click", e => {
            
            if (e.target instanceof HTMLElement && e.target.className === 'showSurveysInFolder') {

                const activeFolders = document.getElementsByClassName('active-folder');

                if (activeFolders[0] instanceof HTMLElement) {
                    activeFolders[0].classList.remove('active-folder');
                }
            
                e.target.className += ' active-folder ';

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
            const modalObj = document.getElementById('myModal')!;
            const modal = new Modal(modalObj);
            modal.show();
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
            div.className = 'col-md-12 col-lg-6 col-xl-4';
            div.setAttribute('data-id', survey.id);
            div.innerHTML = surveyComponent(survey);
            docFragment.appendChild(div);
        });
        surveysObj.appendChild(docFragment);
    }
}

const setEventsSurveys = (surveys: TDashboardSurveyItem[]): void => {

}