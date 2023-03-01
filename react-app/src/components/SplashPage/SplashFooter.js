import githubLogo from "./splash-images/github-icon.png"
import linkedInLogo from "./splash-images/linked-in-icon.png"
import emailIcon from "./splash-images/email-icon.png"

function SplashFooter() {

    return (
        <div id="footer-container">
            <div id="footer-header">creator links:</div>
            <div id="footer-content-container">
                <div id="footer-github-link-container" className="footer-label-container">
                    <div id="footer-github-link-logo-container" className="footer-logo-container" style={{}}>
                        <img id="github-logo" src={githubLogo}></img>
                    </div>
                    <a id="footer-github" className="footer-field" href="https://github.com/kong1214">Github</a>
                </div>
                <div id="footer-linked-in-link-container" className="footer-label-container">
                    <div id="footer-linked-in-link-logo-container" className="footer-logo-container">
                        <img id="linked-in-logo" src={linkedInLogo}></img>
                    </div>
                    <a id="footer-linked-in" className="footer-field" href="https://www.linkedin.com/in/kevin-ong-357b16215/">LinkedIn</a>
                </div>
                <div id="footer-email-container" className="footer-label-container">
                    <div id="footer-email-link-logo-container" className="footer-logo-container">
                        <img id="email-logo" src={emailIcon}></img>
                    </div>
                    <div id="footer-email" className="footer-field">kevin.ong@live.com</div>
                </div>
            </div>
        </div>
    )
}

export default SplashFooter
