import { useContext } from "react";
import { AppCtx } from '../../interfaces';

export default function Score() {

    const appContext = useContext(AppCtx)!;

    const chooseScore = (score: number, e: React.MouseEvent) => {

        let flow = 0;
        if( [7,8].includes(score) ) { flow = 1; }
        if( [9,10].includes(score) ) { flow = 2; }

        appContext.response.score = score;
        
        appContext.questionFlows[flow].forEach(component => {
            appContext.questionsList.push({
                componentName: component,
                isSkipped: false,
                isActive: false,
            });
        });
        appContext.questionsList[0].isActive = true;
    };

    return (
        
        <div className="page page-1">
            <div className="screen-preview-area">

                <div className="screen-preview">

                    <h2 className="item-title text-md-center">How likely are you to recommend us to a friend or colleague?</h2>

                    { appContext.survey.logoUrl && 
                        <div className="text-center">
                            <img src={ appContext.survey.logoUrl } alt="" className="standard-logo" />
                        </div>
                    }

                    <div className="rating-pagination">
                        <nav aria-label="Page navigation">
                            <ul className="pagination mobile-one">

                                {Array.from({length: 11}, (x: number, i: number) => 
                                    <li>
                                        <a 
                                        className={ appContext.response.score === x ? 'btn-activated btn-selected' : '' } 
                                        onClick={ (e) => chooseScore(x,e) } 
                                        href="#-" >
                                            { x }
                                            { x === 0 && <span className="d-inline-block d-md-none"> - Not At All Likely</span> }
                                            { x === 10 && <span className="d-inline-block d-md-none"> - Extremely Likely</span> }
                                        </a>
                                    </li>

                                )}
                                
                            </ul>
                        </nav>
                        <div className="float-left explanation d-none d-md-block">
                            Not At All Likely
                        </div>
                        <div className="float-right explanation d-none d-md-block">
                            Extremely Likely
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
