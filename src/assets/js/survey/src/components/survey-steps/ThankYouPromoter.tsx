


export default function ThankYouPromoter() {

    return (

<div className="page page-2 hide" >
        <div className="screen-preview-area">
            <div className="screen-preview">
                <div className="landing-page">

                    <div className="landing-logo logo-handler" >
                        <img width="500px"  src="{{asset('/uploads/'.$survey->image_url) }}" alt="" />
                    </div>

                    <div className="landing-logo-img">
                        <img src="{{ $survey['logo_url'] }}" alt="" />
                    </div>

                    <div className="landing-description">
                        Description
                    </div>

                    <div className="review-blocks">

                        <div className="review-btn-block doctor-review-google" >
                            <a className="btn btn-primary" href="#1" target="_blank" rel="noreferrer">
                                <img src="/img/icons/google-icon.png" alt="" />
                                <span>Review <i className="doctor-name"></i> on Google</span>
                            </a>
                        </div>

                        <div className="review-btn-block doctor-review-hg" >
                            <a className="btn btn-primary" href="#1" target="_blank" rel="noreferrer">
                                <img src="/img/icons/healthgrades-icon.png" alt="" />
                                <span>Review <i className="doctor-name"></i> on Healthgrades</span>
                            </a>
                        </div>

                        <a className="btn btn-primary" href="{{ $survey['location']['google_review_url'] }}" target="_blank" rel="noreferrer">
                            <img src="/img/icons/google-icon.png" alt="" />
                            <span>Review on Google</span>
                        </a>

                        <a className="btn btn-primary" href="{{ $survey['location']['facebook_review_url'] }}" target="_blank" rel="noreferrer">
                            <img src="/img/icons/facebook-icon.png" alt="" />
                            <span>Review on Facebook</span>
                        </a>

                        <a className="btn btn-primary" href="/#" target="_blank" rel="noreferrer">
                            <img alt="" src="/img/icons/healthgrades-icon.png" />
                            <span>Review on Healthgrades</span>
                        </a>

                    </div>

                    <div className="small small-requirement text-center">
                        <p>Google and Facebook require a Gmail address or Facebook account.</p>
                    </div>

                    <div className="landing-footer">@SatisfiedPatient</div>
                </div>
            </div>

        </div>
    </div>

    );

}


