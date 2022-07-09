import { IFolder } from "../../../../interfaces/folder.interface";

export default (folder: IFolder) => {

    return `
        <a href='#' class='showSurveysInFolder' data-id=${folder.id}>
            ${folder.name}
            <div class='delete-it' data-title='Delete folder ${folder.name}'>
                <img src='/img/icons/trash.svg' />
            </div>
        </a>
    `;
}
