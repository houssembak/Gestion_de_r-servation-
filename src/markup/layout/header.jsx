import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sticky from 'react-stickynode';

// Images
import logo from '../../images/logo.png';
import logoWhite from '../../images/logo-white.png';

const Header = () => {
	
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchFormOpen, setIsSearchBtn] = useState(false);
	const quikSearchBtn = () => setIsSearchBtn(!isSearchFormOpen);
	const quikSearchClose = () => setIsSearchBtn(false);
	const [activeItem, setActiveItem] = useState(null);
	const [isMobileView, setIsMobileView] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	
	const toggleSubmenu = (item) => {
		setActiveItem(item === activeItem ? null : item);
	};
	
	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleMenuLinkClick = () => {
		if (window.innerWidth <= 991) {
			setIsMenuOpen(false);
		}
	};

	const handleContactBtnClick = () => {
		setIsMenuOpen(false);
		// Implement the logic to toggle the contact sidebar here.
	};

	const handleMenuCloseClick = () => {
		setIsMenuOpen(false);
	};
	

	
	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth >= 768);
		};

		// Check the screen size on initial render and whenever the window is resized
		handleResize();
		
		window.addEventListener('resize', handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	},[]);
	
	useEffect(() => {
		const token = localStorage.getItem('token');
		setIsAuthenticated(!!token);
	}, []);
	
	const menuItems = [
		{
			id: 'home',
			name: 'Home',
			linkName: '#',
		},
		{
			id: 'pages',
			name: 'Pages',
			linkName: '#',
			
			subItems: [
				{
					id: 'aboutus',
					displayName: 'About Us',
					linkName: 'about-us'
				},
				{
					id: 'team',
					displayName: 'Our Team',
					linkName: 'team'
				},
				{
					id: 'faq',
					displayName: "FAQ's",
					linkName: 'faq'
				},
				{
					id: 'booking',
					displayName: 'Booking',
					linkName: 'booking'
				},
				{
					id: 'error',
					displayName: 'Error 404',
					linkName: 'error-404'
				},
				{
					id: 'formLogin',
					displayName: 'Login / Register',
					linkName: 'form-login'
				},
				{
					id: 'chatbot',
					displayName: 'chatbot',
					linkName: 'chatbot'
				},
			]
		},
		{
			id: 'services',
			name: 'Services',
			linkName: '',
			
			subItems: [
				{
					id: 'services',
					displayName: 'Service',
					linkName: 'services'
				},
				{
					id: 'serviceDetail',
					displayName: 'Service Detail',
					linkName: 'service-detail'
				},
			]
		},
		{
			id: 'blog',
			name: 'Blog',
			linkName: '#',
			
			subItems: [
				{
					id: 'blogGrid',
					displayName: 'Blogs',
					linkName: 'blog-grid'
				},
				{
					id: 'blogDetails',
					displayName: 'Blog Details',
					linkName: 'blog-details'
				},
			]
		},
		{
			id: 'contactUs',
			name: 'Contact Us',
			linkName: 'contact-us'
		}
	];
	
	return(
		<header className="header header-transparent rs-nav">
			<Sticky enabled={true} className="sticky-header navbar-expand-lg">
				<div className="menu-bar clearfix">
					<div className="container-fluid clearfix">
						<div className="menu-logo logo-dark">
							<Link to="/"><img src={logo} alt=""/></Link>
						</div>
						
						<button className={`navbar-toggler collapsed menuicon justify-content-end ${isMenuOpen ? 'open' : ''}`}
							type="button"
							onClick={toggleMenu}
							aria-label="Toggle navigation">
							<span></span>
							<span></span>
							<span></span>
						</button>

						<div className="secondary-menu">
							<ul>
								<li className="search-btn">
									<button
										id="quikSearchBtn"
										type="button"
										className="btn-link"
										onClick={quikSearchBtn}
										>										
										<i className="las la-search"></i>
									</button>
								</li>
								<li className="num-bx"><a href="tel:(+216)99952023"><i className="fas fa-phone-alt"></i> +216 72 456 456</a></li>
								{!isAuthenticated && (
									<>
										<li className="btn-area"><Link to="/form-register" className="btn btn-primary shadow">REGISTER <i className="btn-icon-bx fas fa-chevron-right"></i></Link></li>
										<li className="btn-area"><Link to="/form-login" className="btn btn-primary shadow">LOGIN <i className="btn-icon-bx fas fa-chevron-right"></i></Link></li>
									</>
								)}
								{isAuthenticated && (
									<li className="btn-area">
										<Link 
											to="/logout" 
											className="btn btn-primary shadow"
											onClick={(e) => {
												e.preventDefault();
												localStorage.removeItem('token');
												localStorage.removeItem('user');
												setIsAuthenticated(false);
												window.location.href = '/';
											}}
										>
											LOGOUT <i className="btn-icon-bx fas fa-sign-out-alt"></i>
										</Link>
									</li>
								)}
							</ul>
						</div>
						
						<div className={`menu-links navbar-collapse collapse justify-content-end ${isMenuOpen ? 'show' : ''}`} id="menuDropdown">
							<div className="menu-logo">
								<Link to="/"><img src={logoWhite} alt=""/></Link>
							</div>
							
							<ul className="nav navbar-nav">	
								{menuItems.map((item) => (
									<li
										key={item.id}
											className={`${activeItem === item.id ? 'open' : ''}`}
											onClick={() => toggleSubmenu(item.id)}
										>
										{item.subItems ? (
											<Link to="#">
												{item.name}
												<i className={`fas fa-plus`}></i>
											</Link>
										) : (
											<Link to={`/${item.linkName}`} onClick={handleMenuLinkClick}>
												{item.name}
											</Link>
										)}
										{(isMobileView || activeItem === item.id) && item.subItems && (
											<ul className="sub-menu">
												{item.subItems.map((subItem, index) => (
													<li key={subItem.id}><Link to={`/${subItem.linkName}`} onClick={handleMenuLinkClick}><span>{subItem.displayName}</span></Link></li>
												))}
											</ul>
										)}
									</li>
								))}
							</ul>
							
							<ul className="social-media">
								<li><a target="_blank" rel="noreferrer" href="https://www.facebook.com/" className="btn btn-primary"><i className="fab fa-facebook-f"></i></a></li>
								<li><a target="_blank" rel="noreferrer" href="https://www.google.com/" className="btn btn-primary"><i className="fab fa-google"></i></a></li>
								<li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/" className="btn btn-primary"><i className="fab fa-linkedin-in"></i></a></li>
								<li><a target="_blank" rel="noreferrer" href="https://twitter.com/" className="btn btn-primary"><i className="fab fa-twitter"></i></a></li>
							</ul>
							
							<div className="menu-close" onClick={handleMenuCloseClick}>
								<i className="ti-close"></i>
							</div>
							
						</div>
					</div>
				</div>
			</Sticky>
			
			<div className={`nav-search-bar ${isSearchFormOpen ? 'show' : ''}`}>
				<form>
					<input type="text" className="form-control" placeholder="Type to search"/>
					<span><i className="ti-search"></i></span>
				</form>
				<span id="searchRemove" onClick={quikSearchClose}><i className="ti-close"></i></span>
			</div>
			
		</header>
	
	);
}

export default Header;