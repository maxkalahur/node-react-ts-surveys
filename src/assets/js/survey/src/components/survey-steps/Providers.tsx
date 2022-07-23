


export default function Providers() {

    return (

        <div className="page page-2 hide">
            <div className="screen-preview-area">

                <form id="question-form">
                    <div className="screen-preview">
                        <div className="why-page">
                            <h2 id="item-title" className="item-title text-center">Question</h2>
                            <div className="bd-example">
                                <div className="form-group">
                                    <div id="select-input" className=" block-items" >
                                        
                                        <button data-doctor_id="{{ $field->id }}" type="button" value="{{$field->question}}" className="btn btn-select btn-lg btn-block choose-doctor @if(isset($responses[$item->item_type]) && $field->question == $responses[$item->item_type]['answer']){{'btn-selected'}}@endif">Doc Name</button>
                                        
                                        <button data-doctor_id="{{ $field->id }}" type="button" value="{{$field->question}}" className="btn btn-select btn-lg btn-block choose-doctor @if(isset($responses[$item->item_type]) && $field->question == $responses[$item->item_type]['answer']){{'btn-selected'}}@endif">Doc Name</button>

                                        <button data-doctor_id="0" type="button" value="{{ App\Models\MultipleChoiceItem::UNKNOWN_DOCTOR_NAME }}" className="btn btn-select btn-lg btn-block choose-doctor @if(isset($responses[$item->item_type]) && App\Models\MultipleChoiceItem::UNKNOWN_DOCTOR_NAME == $responses[$item->item_type]['answer']){{'btn-selected'}}@endif">Unknown</button>

                                        <p className="error d-none"><img src="/img/icons/warning.svg" alt="" /> This is a required question</p>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>
                    </div>
                </form>

            </div>
        </div>

    );

}


