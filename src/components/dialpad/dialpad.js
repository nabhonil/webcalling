import React from 'react';

const Dialpad = (props) => {
    // Component logic goes here
    function populateCallingNumber(event) {
        event.preventDefault();
        const phoneNumber = document.getElementById('phoneNumber');
        phoneNumber.value += event.target.value;
    }

    function clearCallingNumber(event) {
        event.preventDefault();
        const phoneNumber = document.getElementById('phoneNumber');
        phoneNumber.value = '';
    }

    function deleteLastDigit(event) {
        event.preventDefault();
        const phoneNumber = document.getElementById('phoneNumber');
        phoneNumber.value = phoneNumber.value.slice(0, -1);
    }

    function makeNewCall(event) {
       props.onMakeNewCall(document.getElementById('phoneNumber').value);
    }

    return (
        // JSX code goes here
        <div id="contentPanel" className="webphone-dialpad bg-primary">
            <div className="row g-0 p-2 border border-primary">
                <div className="col justify-content-center align-content-center">
                    <input type="text" className="w-100" id="phoneNumber" placeholder="Enter Phone Number" />
                </div>
            </div>
            <div className="row g-0 border border-primary border-top-0">
                <div className="col bg-light justify-content-center align-content-center">
                    <button type="button" id="key" value="1" onClick={populateCallingNumber} className="btn webphone-dialpad-button btn-secondary btn-sm border border-dark m-1">1</button>
                    <button type="button" id="key" value="2" onClick={populateCallingNumber} className="btn webphone-dialpad-button btn-secondary btn-sm border border-dark m-1">
                        2<br/>A B C
                    </button>
                    <button type="button" id="key" value="3" onClick={populateCallingNumber} className="btn webphone-dialpad-button btn-secondary btn-sm border border-dark m-1">
                        3<br/>D E F
                    </button>
                </div>
            </div>
            <div className="row g-0 border border-primary border-top-0">
                <div className="col bg-light justify-content-center align-content-center">
                    <button type="button" id="key" value="4" onClick={populateCallingNumber} className="btn webphone-dialpad-button btn-secondary btn-sm border border-dark m-1">
                        4<br/>G H I
                    </button>
                    <button type="button" id="key" value="5" onClick={populateCallingNumber} className="btn webphone-dialpad-button btn-secondary btn-sm border border-dark m-1">
                        5<br/>J K L
                    </button>
                    <button type="button" id="key" value="6" onClick={populateCallingNumber} className="btn webphone-dialpad-button btn-secondary btn-sm border border-dark m-1">
                        6<br/>M N O
                    </button>
                </div>
            </div>
            <div className="row g-0 border border-primary border-top-0">
                <div className="col bg-light justify-content-center align-content-center">
                    <button type="button" id="key" value="7" onClick={populateCallingNumber} className="btn webphone-dialpad-button btn-secondary btn-sm border border-dark m-1">
                        7<br/>P Q R S
                    </button>
                    <button type="button" id="key" value="8" onClick={populateCallingNumber} className="btn webphone-dialpad-button btn-secondary btn-sm border border-dark m-1">
                        8<br/>T U V
                    </button>
                    <button type="button" id="key" value="9" onClick={populateCallingNumber} className="btn webphone-dialpad-button btn-secondary btn-sm border border-dark m-1">
                        9<br/>W X Y Z
                    </button>
                </div>
            </div>
            <div className="row g-0 border border-primary border-top-0">
                <div className="col bg-light justify-content-center align-content-center">
                    <button type="button" id="key" value="*" onClick={populateCallingNumber} className="btn webphone-dialpad-button btn-secondary btn-sm border border-dark m-1">*</button>
                    <button type="button" id="key" value="0" onClick={populateCallingNumber} className="btn webphone-dialpad-button btn-secondary btn-sm border border-dark m-1">0</button>
                    <button type="button" id="key" value="#" onClick={populateCallingNumber} className="btn webphone-dialpad-button btn-secondary btn-sm border border-dark m-1">#</button>
                </div>
            </div>
            <div className="row g-0 border border-primary border-top-0">
                <div className="col bg-light justify-content-center align-content-center">
                    <button type="button" onClick={clearCallingNumber} className="btn webphone-dialpad-button btn-primary btn-sm border border-dark m-1">Clear</button>
                    <button type="button" onClick={makeNewCall} className="btn webphone-dialpad-button btn-success btn-sm border border-dark m-1">Call</button>
                    <button type="button" onClick={deleteLastDigit} className="btn webphone-dialpad-button btn-primary btn-sm border border-dark m-1">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Dialpad;