const AboutUs = () => {
  return ( <div className='container'>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark navbarScroll">
        <div className="container">
          <div className="header__content">
            <div className="header__logo-container">
              <span className="header_logo-sub navbar-brand"></span>
            </div>
          </div>

          <button className="navbar-toggler" style={{ backgroundColor: 'rgb(25, 25, 25)' }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              {/* <li className="nav-item active">
                <a href="#home">Home</a>
              </li> */}
              <li className="nav-item">
                <a href="#about">About</a>
              </li>
              <li className="nav-item">
                <a href="#resume">Resume</a>
              </li>
              <li className="nav-item">
                <a href="#portfolio">Projects</a>
              </li>
              <li className="nav-item">
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="bgimage" id="home" style={{ objectFit: 'cover', objectPosition: 'center top', width: '100%', height: '100%' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 maintext">
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container mt-4 pt-4">
          <h1 className="text-center">About Me</h1>
          <div className="row mt-4">
            <div className="col-lg-4">
              <img src={profileImage} className="imageAboutPage" alt="" />
            </div>

            <div className="col-lg-8">
              <div className="row mt-3">
                <div className="col-md-6">
                  <ul>
                    <li>Name: Abel Demere</li>
                    <li>Age: 26</li>
                    <li>Occupation: Fullstack Developer</li>
                  </ul>
                </div>
                <p>I am a Fullstack Developer. With a passion for programming and problem-solving, I have dedicated myself to honing my skills and expertise in web development. I strive to create innovative and efficient solutions that meet the needs of modern businesses and users.

                  Throughout my journey as a developer, I have gained valuable experience in front-end and back-end technologies, including HTML, CSS, JavaScript, React, Node.js, and more. I enjoy working on diverse projects and collaborating with talented individuals to bring ideas to life.
                </p>
              </div>
              <div className="row mt-3">
                <p>My dedication to continuous learning and staying up-to-date with the latest industry trends allows me to deliver high-quality code and create seamless user experiences. I am driven by the desire to contribute to the advancement of technology and make a positive impact in the digital world.

                  Let's connect and explore how we can work together to create exceptional web solutions that elevate user experiences and drive business growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="resume">
  <div className="container mt-4 pt-4">
    <h1 className="text-center">Resume</h1>
    <div className="row mt-4 justify-content-center">
      <div className="col-lg-4">
        <Link to="/Resume" style={{ textDecoration: 'none' }}>
          <div className="card">
            <img className="card-img-top" src={CVAbel_Demere} alt="Card image" style={{ width: '100%', height: '100%' }} />
            <div className="card-body">
            <h4 className="card-title container" style={{ color: 'black', width: '100px' }}>CV</h4>
            <div className="text-center">
              <button class="btn btn-success click-button" onClick={handleDownloadClick}>Download PDF</button>
            </div>
          </div>
        
      </div>
      </Link>
    </div>
    </div>
  </div>
</section>






      <section style={{ color: 'white' }} id="portfolio">
        <div className="container mt-3">
          <h1 className="text-center">Projects</h1>
          <div className="row">
            <div className="col-lg-4 mt-4">
            <Link to="/Calculator" style={{ textDecoration: 'none' }}>
              <div className="card">
                
                  <img className="card-img-top" src={porImage} alt="Card image" style={{ width: '100%', height: '100%' }} />
                  <div className="card-body">
                    <h4 className="card-title" style={{ color: 'black' }}>Calculator</h4>
                    <p className="card-text">"Calculator, built with HTML, CSS, and JavaScript. It offers basic arithmetic operations and a clean, responsive design."</p>
                    <div className="text-center">
                      <button class="btn btn-success click-button">View app</button>
                    </div>
                  </div>
               
              </div>
              </Link>
            </div>
            
            <div className="col-lg-4 mt-4">
            <Link to="/Data" style={{ textDecoration: 'none' }}>
              <div className="card portfolioContent">
                        <img className="card-img-top" src={DataEntry} alt="Card image" style={{ width: '100%', height: '100%' }} />
                  <div className="card-body">
                    <h4 className="card-title">Data Table</h4>
                    <p className="card-text">Data entry table, where you can effortlessly input and manage information. This interactive table allows you to add data entries with ease.</p>
                    <div className="text-center">
                      <button class="btn btn-success click-button">View app</button>
                    </div>
                  </div>
              </div>
              </Link>
            </div>


            <div className="col-lg-4 mt-4">
            <Link to="/AgeCalculator" style={{ textDecoration: 'none' }}>
              <div className="card portfolioContent">
              <img className="card-img-top" src={AgeCalculator} alt="Card image" style={{ width: '100%', height: '100%' }} />
                <div className="card-body">
                  <h4 className="card-title">Age Calculator</h4>
                  <p className="card-text">Claculates your age when Birth Day is Entered</p>
                  <div className="text-center">
                  <button class="btn btn-success click-button">View app</button>
                  </div>
                </div>
                 </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ color: 'white' }} id="portfolio">
        <div className="container mt-3">
          <div className="row">
            <div className="col-lg-4 mt-4">
            <Link to="/BMI" style={{ textDecoration: 'none' }}>
              <div className="card">
                <img className="card-img-top" src={BmiCalculator} alt="Card image" style={{ width: '100%', height: '100%' }} />
                <div className="card-body">
                  <h4 className="card-title">BMI Calculator</h4>
                  <p className="card-text">A simple tool built with React to calculate Body Mass Index (BMI). Enter your weight and height, and the calculator will provide your BMI value and a remark indicating whether you are underweight, healthy weight, overweight, or obese."</p>
                  <div className="text-center">
                  <button class="btn btn-success click-button">View app</button>
                  </div>
                 
                </div>
                
              </div>
              </Link>
            </div>
            <div className="col-lg-4 mt-4">
            <Link to="/TTT" style={{ textDecoration: 'none' }}>
              <div className="card portfolioContent">
                <img className="card-img-top" src={TicTacToe} alt="Card image" style={{ width: '100%', height: '100%' }} />
                <div className="card-body">
                  <h4 className="card-title">Tic Tac Toe</h4>
                  <p className="card-text">A classic two-player game implemented using React. Play against a friend and aim to get three marks in a row before your opponent does..</p>
                  <div className="text-center">
                  <button class="btn btn-success click-button">View app</button>
                 </div>
                </div>
              </div>
              </Link>
            </div>
            <div className="col-lg-4 mt-4">
              <div className="card portfolioContent">
                <img className="card-img-top" src={calculatorImage} alt="Card image" style={{ width: '100%', height: '100%' }} />
                <div className="card-body">
                  <h4 className="card-title">Sage Training Institute Website</h4>
                  <p className="card-text" style={{ color: 'red' }}>The link is unavailable because the website is currently under Delvelopment and will be available when its completed.</p>
                  <div className="text-center">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>




      {/* <section id="contact">
        <div class="container mt-3 C">
          <div><h1 class="text-center">Contact Me</h1></div>

          <div class="container contact-container p-3 mb-2 bg-dark col-lg-6">
            <form>
              <input type="text" class="form-control form-control-lg bg-dark text-light" data-placeholder="Name" disabled />
              <input type="email" class="form-control mt-3 bg-dark text-light" data-placeholder="Email" disabled />
              <input type="text" class="form-control mt-3 bg-dark text-light" data-placeholder="Subject" disabled />
              <div class="mb-3 mt-3">
                <textarea class="form-control bg-dark text-light" rows="5" id="comment" name="text" data-placeholder="Project Details" disabled></textarea>
              </div>
            </form>
            <button type="button" class="btn btn-success mt-3">Contact Me</button>
          </div>
        </div>
      </section> */}


      <section id="contact">
        <div class="container mt-3 C">
          <div><h1 class="text-center">Contact Me</h1></div>
        </div>
      </section>


      <footer id="footer">
        <div className="container-fluid">
          <div className="social-icons mt-4">
            <a href="https://t.me/abel_d" target="_blank" style={{ marginRight: '20px' }}>
              <i className="fab fa-telegram"></i>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100075329631293" target="_blank" style={{ marginRight: '20px' }}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/a6el.d/" target="_blank" style={{ marginRight: '20px' }}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com/A6elDemere" target="_blank" style={{ marginRight: '20px' }}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/in/abel-demere-a6282a281/" target="_blank" style={{ marginRight: '20px' }}>
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>


    </div>
  );
}

export default AboutUs;
