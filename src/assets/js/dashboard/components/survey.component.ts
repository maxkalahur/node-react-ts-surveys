import { TDashboardSurveyItem } from "../../../../types/dashboard/survey.type";

export default (survey: TDashboardSurveyItem) => {

    return `
      <div class="survey-box">
          <div class="survey-header"><input class="survey-title" item-id="142" type="text" value="${survey.title}" data-index="0" data-type="editSurveyName"></div>
          <div class="survey-body">
            <div class="folder-here"><img src="/img/icons/folder.svg"><strong class="folder-name">${survey.organizationName}</strong><span id="folder-item" item-id="${survey.organizationId}" class="removeFolderFromSurvey" data-index="0" data-folder="${survey.organizationName}" folder-id="${survey.organizationId}"><img src="/img/icons/trash.svg"></span></div>
            <div class="survey-link"><input type="text" class="form-control" value="${survey.link}" readonly=""><button class="btn btn-link" data-action="copyTextField">Copy</button></div>
          </div>
          <div class="survey-stats">
            <div class="row align-items-center">
                <div class="col-md-4">
                  <p><strong>${survey.amountOfResponses}</strong> Responses</p>
                </div>
                <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-8">
                  <div class="survey-static">
                      <p><span>Provider Type</span> <strong>${survey.isMultipleProviders ? 'Multiple' : 'Single'}</strong></p>
                      <p><span>Last Response</span> <strong>${survey.lastResponseDateAt}</strong></p>
                      <p><span>Last Update</span> <strong>${survey.updatedAt}</strong></p>
                      <p><span>Request to contact?</span> <strong>${survey.isContactPageOff ? 'No' : 'Yes'}</strong></p>
                  </div>
                </div>
            </div>
          </div>
          <div class="survey-bottom">
            <div class="row">
                <div class="col-md-12"><a href="/dashboard/${survey.id}" class="btn btn-link">Preview</a><a href="#" item-id="142" class="deleteSurveyButton btn btn-link" data-index="0">Delete</a><a href="${survey.link}" target="_blank" class="btn btn-link">Live Preview</a></div>
            </div>
          </div>
      </div>

    `;
}