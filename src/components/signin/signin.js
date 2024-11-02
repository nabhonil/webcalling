import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();
    
    function initializeCalling() {
        const statusContent = document.getElementById('statusContent');
        statusContent.innerHTML = 'Initializing...';
        const userAgentId = document.getElementById('userAgentId').value;
        const serviceURL = document.getElementById('serviceURL').value;
        //Call the next page
        navigate('/call', { 
            state: { 
                service_url: serviceURL,
                user_agent: userAgentId
            }
        });
    }

    return (
        <div className="card webphone border border-secondary">
            <div className="card-header h4">
                WebRTC Phone
            </div>
            <div id="signin" className="container card-body">
                <div className="row"><div className="col card-title h5">Agent Sign In</div></div>
                <div className="row mt-1">
                    <div className="col input-group input-group-sm">
                        <span className="input-group-text">User Agent:</span>
                        <input type="text" className="form-control" id="userAgentId" placeholder="Enter your Service URL" defaultValue="1002"/>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col input-group input-group-sm">
                        <span className="input-group-text">Sip Server:</span>
                        <input type="text" className="form-control" id="serviceURL" placeholder="Enter your Service URL" defaultValue="10.105.10.117"/>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col align-self-end">
                        <button type="button" className="btn btn-primary btn-sm" onClick={initializeCalling}>Initialize Calling</button>
                    </div>
                </div>
            </div>
            <div className="card-footer text-muted">
                <div className="row">
                    <div className="col card-text small"><label>Status:&nbsp;</label><label id="statusContent">Ready</label></div>
                </div>
            </div>
        </div>
    );
};

export default Signin;