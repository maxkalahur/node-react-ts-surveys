

export default function Question() {

    return (

        <div className="page page-2 hide">
            <div className="screen-preview-area">
                
                <form id="question-form" >
                    <div className="screen-preview">

                        <div id="1" className="why-page">
                            <h2 id="item-title" item-type="1" item-id="1" className="item-title">Question</h2>
                            <div className="bd-example">
                                <textarea required className="question-input form-control text-box-normal"></textarea>
                                <p className="error d-none"><img alt="" src="/img/icons/warning.svg" /> This is a required question</p>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}

