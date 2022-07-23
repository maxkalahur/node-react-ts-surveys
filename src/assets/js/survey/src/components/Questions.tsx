import { useContext } from "react";
import { AppCtx } from '../interfaces';
import Score from './survey-steps/Score';
import QuestionItem from './QuestionItem';


export default function Questions() {

    const appContext = useContext(AppCtx)!;
    const questionItems = appContext.questionsList;

    const pageNext = () => {
        let activeIndex: number;
        questionItems.every( (e, i) => {
            if( e.isActive ) {
                e.isActive = false;
                activeIndex = i;
            }
            if( i > activeIndex && e.isSkipped === false ) {
                e.isActive = true;
                return false;
            }
            return true;
        });
    };

    const pageBack = () => {
        let activeIndex: number;
        [...questionItems].reverse().every( (e, i) => {
            if( e.isActive ) {
                questionItems[i].isActive = false;
                activeIndex = i;
            }
            if( i < activeIndex && e.isSkipped === false ) {
                questionItems[i].isActive = true;
                return false;
            } 
            return true;
        });
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="pages">

                    <div className="page page-2 hide">
                        <div className="screen-preview-area">
                            <form id="question-form" >
                                <div className="screen-preview">
                                    <div className="why-page">
                                        <button onClick={pageBack} className="prev-page control-button"></button>
                                        <button onClick={pageNext} type="submit" className="next-page control-button"></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <Score />

                    <QuestionItem />

                </div>
            </div>
        </div>
    );
}