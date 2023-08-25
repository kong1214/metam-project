import githubLogo from "./splash-images/github-icon.png"
import linkedInLogo from "./splash-images/linked-in-icon.png"
import emailIcon from "./splash-images/email-icon.png"

function SplashFooter() {

    return (
        <div id="footer-container">
            <div id="footer-header">creator links:</div>
            <div id="footer-content-container">
                <div id="footer-github-link-container" className="footer-label-container">
                    <a id="footer-github-link-logo-container" className="footer-logo-container" href="https://github.com/kong1214">
                        <img id="github-logo" className="footer-logo" src={githubLogo}></img>
                    </a>
                    <a id="footer-github" className="footer-field" href="https://github.com/kong1214">Github</a>
                </div>
                <div id="footer-linked-in-link-container" className="footer-label-container">
                    <a id="footer-linked-in-link-logo-container" className="footer-logo-container" href="https://www.linkedin.com/in/kevin-ong-357b16215/">
                        <img id="linked-in-logo" className="footer-logo" src={linkedInLogo}></img>
                    </a>
                    <a id="footer-linked-in" className="footer-field" href="https://www.linkedin.com/in/kevin-ong-357b16215/">LinkedIn</a>
                </div>
                <div id="footer-email-container" className="footer-label-container">
                    <a id="footer-email-link-logo-container" className="footer-logo-container" href="mailto: kevin.ong@live.com">
                        <img id="email-logo" className="footer-logo" src={emailIcon}></img>
                    </a>
                    <a id="footer-email" className="footer-field" href="mailto: kevin.ong@live.com">kevin.ong@live.com</a>
                </div>
            </div>
        </div>
    )
}

export default SplashFooter
