

export default function Contacts() {

    return (

        <div className="page page-2 hide">
            <div className="screen-preview-area">

                <form id="question-form" >
                    <div className="screen-preview">
                        <div id="1" className="why-page">
                            <h2 id="item-title" item-type="1" item-id="1" className="item-title">Question</h2>
                            <div  className="bd-example">

                                <div className="form-group">
                                    <input className="form-control contact-field multi-input-contacts" type="text"/>
                                </div>

                                <div className="form-group">
                                    <input className="form-control contact-field multi-input-contacts" type="email" />
                                </div>

                                <p className="error d-none"><img alt="" src="/img/icons/warning.svg" /> This is a required question</p>

                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}
