

export default function Name() {

    return (
        <div className="page page-2 hide" >
            <div className="screen-preview-area">

                <form id="question-form" >
                    <div className="screen-preview">
                        <div  id="1" className="why-page">
                            <h2 id="item-title" item-type="1" item-id="1" className="item-title">Question</h2>
                            <div  className="bd-example">
                                <input className="question-input form-control contact-field" placeholder="First & Last Name"
                                            type="text" required />

                                <p className="error d-none"><img alt="" src="/img/icons/warning.svg" /> This is a required question</p>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}



