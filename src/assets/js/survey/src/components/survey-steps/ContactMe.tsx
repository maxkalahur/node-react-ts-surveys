

export default function ContactMe() {
    return (

        <div className="page page-2 hide">
            <div className="screen-preview-area">
        
                <form id="question-form" className="question-form">
                    <div className="screen-preview">
                        <div id="1" className="why-page">
                            <h2 className="item-title text-center">Question</h2>

                            <div id="select-input" className="block-items" >
                                <button type="button" value="Yes" className="btn btn-select btn-block">Yes</button>
                                <button type="button" value="No" className="btn btn-select btn-block">No</button>
                                <p className="error d-none"><img alt="" src="/img/icons/warning.svg" /> This is a required question</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}








