import Logo from "../../assets/logo-1@2x.png"
import Mail from "../../assets/mail-1@2x.png"

function Footer(){
    return(
        <div className="container-fluid footer">
            <div className="row">
                {/* Logo Title  */}
                <div className="col d-flex logo-pos">
                    {/* Image */}
                    <img className="img-fluid logo-size" src={Logo}/> 
                    {/* Title */}
                    <div className="d-flex-column">
                        <p className="container-fluid h4 text-white mt-3">
                            Sign Language Handbook
                        </p>
                        <p className="text-white footer-desc">
                            by atomic
                        </p>
                    </div>
                </div>

                <div className="col d-flex">
                    <img className="img-fluid mail-size" src={Mail}/>
                    <p className="contact-email">Email us: support.atomic@gmail.com</p>
                    
                </div>
                <div className="col">
                    <br/>
                    <img className="img-fluid mail-size" src={Mail}/>
                    <p className="contact-email">Email us: support.atomic@gmail.com</p>
                </div>
            </div>
        </div>
    )
}


export default Footer;