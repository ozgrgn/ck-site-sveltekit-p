import Http from './http';
import ENV from '../env';

const sendMail = (lang, name, phone, email, message, treatment) => {
	return Http.post(`${ENV.API_URL}/services/email`, {
		lang,
		name,
		phone,
		email,
		message,
		treatment
	});
};

const login = (email, password) => {
	return Http.post(`${ENV.API_URL}/admin/login`, { email, password });
};

const uploadImage = (file) => {
	const formData = new FormData();

	formData.append('file', file);

	return Http.postFormData(`${ENV.API_URL}/services/file-upload`, formData);
};

// BlogsPages
const getBlogsPages = (limit, skip) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/blogsPage`, { ...data });
};
const addBlogsPage = (data) => {
	return Http.post(`${ENV.API_URL}/blogsPage`, data);
};

const updateBlogsPage = (blogsPageId, data) => {
	return Http.patch(`${ENV.API_URL}/blogsPage/${blogsPageId}`, {
		...data
	});
};

const getBlogsPage = (blogsPageId) => {
	return Http.get(`${ENV.API_URL}/blogsPage/${blogsPageId}`);
};

const deleteBlogsPage = (blogsPageId) => {
	return Http.delete(`${ENV.API_URL}/blogsPage/${blogsPageId}`);
};

// Languages
const getLanguages = (limit, skip) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/language`, { ...data });
};
const addLanguage = (data) => {
	return Http.post(`${ENV.API_URL}/language`, data);
};

const updateLanguage = (languageId, data) => {
	return Http.patch(`${ENV.API_URL}/language/${languageId}`, {
		...data
	});
};

const getLanguage = (languageId) => {
	return Http.get(`${ENV.API_URL}/language/${languageId}`);
};

const deleteLanguage = (languageId) => {
	return Http.delete(`${ENV.API_URL}/language/${languageId}`);
};
// Generals
const getGenerals = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/general`, { ...data });
};
const addGeneral = (data) => {
	return Http.post(`${ENV.API_URL}/general`, data);
};

const updateGeneral = (generalId, data) => {
	return Http.patch(`${ENV.API_URL}/general/${generalId}`, {
		...data
	});
};

const getGeneral = (generalId) => {
	return Http.get(`${ENV.API_URL}/general/${generalId}`);
};

const deleteGeneral = (generalId) => {
	return Http.delete(`${ENV.API_URL}/general/${generalId}`);
};
// Translates
const getTranslates = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/translate`, { ...data });
};
const addTranslate = (data) => {
	return Http.post(`${ENV.API_URL}/translate`, data);
};

const updateTranslate = (translateId, data) => {
	return Http.patch(`${ENV.API_URL}/translate/${translateId}`, {
		...data
	});
};

const getTranslate = (translateId) => {
	return Http.get(`${ENV.API_URL}/translate/${translateId}`);
};

const deleteTranslate = (translateId) => {
	return Http.delete(`${ENV.API_URL}/translate/${translateId}`);
};
// ReferenceLogos
const getReferenceLogos = (limit, skip, lang) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (lang) {
		data.lang = lang;
	}

	return Http.get(`${ENV.API_URL}/referenceLogo`, { ...data });
};
const addReferenceLogo = (data) => {
	return Http.post(`${ENV.API_URL}/referenceLogo`, data);
};

const updateReferenceLogo = (referenceLogoId, data) => {
	return Http.patch(`${ENV.API_URL}/referenceLogo/${referenceLogoId}`, {
		...data
	});
};

const getReferenceLogo = (referenceLogoId) => {
	return Http.get(`${ENV.API_URL}/referenceLogo/${referenceLogoId}`);
};

const deleteReferenceLogo = (referenceLogoId) => {
	return Http.delete(`${ENV.API_URL}/referenceLogo/${referenceLogoId}`);
};
// Actions
const getActions = (limit, skip,lang) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (lang) {
		data.lang = lang;
	}

	return Http.get(`${ENV.API_URL}/action`, { ...data });
};
const addAction = (data) => {
	return Http.post(`${ENV.API_URL}/action`, data);
};

const updateAction = (actionId, data) => {
	return Http.patch(`${ENV.API_URL}/action/${actionId}`, {
		...data
	});
};

const getAction = (actionId) => {
	return Http.get(`${ENV.API_URL}/action/${actionId}`);
};

const deleteAction = (actionId) => {
	return Http.delete(`${ENV.API_URL}/action/${actionId}`);
};
// Faqs
const getFaqs = (lang, homePage, treatment, treatmentGroup, perma, limit, skip) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (lang) {
		data.lang = lang;
	}
	if (treatmentGroup) {
		data.treatmentGroup = treatmentGroup;
	}
	if (treatment) {
		data.treatment = treatment;
	}
	if (homePage) {
		data.homePage = homePage;
	}
	if (perma) {
		data.perma = perma;
	}

	return Http.get(`${ENV.API_URL}/faq`, { ...data });
};
const addFaq = (data) => {
	return Http.post(`${ENV.API_URL}/faq`, data);
};

const updateFaq = (faqId, data) => {
	return Http.patch(`${ENV.API_URL}/faq/${faqId}`, {
		...data
	});
};

const getFaq = (faqId) => {
	return Http.get(`${ENV.API_URL}/faq/${faqId}`);
};

const deleteFaq = (faqId) => {
	return Http.delete(`${ENV.API_URL}/faq/${faqId}`);
};
// Reviews
const getReviews = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/review`, { ...data });
};
const addReview = (data) => {
	return Http.post(`${ENV.API_URL}/review`, data);
};

const updateReview = (reviewId, data) => {
	return Http.patch(`${ENV.API_URL}/review/${reviewId}`, {
		...data
	});
};

const getReview = (reviewId) => {
	return Http.get(`${ENV.API_URL}/review/${reviewId}`);
};

const deleteReview = (reviewId) => {
	return Http.delete(`${ENV.API_URL}/review/${reviewId}`);
};
// Staffs
const getStaffs = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/staff`, { ...data });
};
const addStaff = (data) => {
	return Http.post(`${ENV.API_URL}/staff`, data);
};

const updateStaff = (staffId, data) => {
	return Http.patch(`${ENV.API_URL}/staff/${staffId}`, {
		...data
	});
};

const getStaff = (staffId) => {
	return Http.get(`${ENV.API_URL}/staff/${staffId}`);
};

const deleteStaff = (staffId) => {
	return Http.delete(`${ENV.API_URL}/staff/${staffId}`);
};
// TreatmentGroups
const getTreatmentGroups = (lang, limit, skip, perma) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (perma) {
		data.perma = perma;
	}
	return Http.get(`${ENV.API_URL}/treatmentGroup`, { ...data });
};
const addTreatmentGroup = (data) => {
	return Http.post(`${ENV.API_URL}/treatmentGroup`, data);
};

const updateTreatmentGroup = (treatmentGroupId, data) => {
	return Http.patch(`${ENV.API_URL}/treatmentGroup/${treatmentGroupId}`, {
		...data
	});
};

const getTreatmentGroup = (treatmentGroupId) => {
	return Http.get(`${ENV.API_URL}/treatmentGroup/${treatmentGroupId}`);
};

const deleteTreatmentGroup = (treatmentGroupId) => {
	return Http.delete(`${ENV.API_URL}/treatmentGroup/${treatmentGroupId}`);
};

// Treatments
const getTreatments = (lang, treatmentGroup, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (treatmentGroup) {
		data.treatmentGroup = treatmentGroup;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/treatment`, { ...data });
};
const addTreatment = (data) => {
	return Http.post(`${ENV.API_URL}/treatment`, data);
};

const updateTreatment = (treatmentId, data) => {
	return Http.patch(`${ENV.API_URL}/treatment/${treatmentId}`, {
		...data
	});
};

const getTreatment = (treatmentId) => {
	return Http.get(`${ENV.API_URL}/treatment/${treatmentId}`);
};
const getTreatmentViaPerma = (treatmentPerma) => {
	return Http.get(`${ENV.API_URL}/treatment/perma/${treatmentPerma}`);
};
const deleteTreatment = (treatmentId) => {
	return Http.delete(`${ENV.API_URL}/treatment/${treatmentId}`);
};

// BlogCats
const getBlogCats = (lang, treatmentGroup, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (treatmentGroup) {
		data.treatmentGroup = treatmentGroup;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/blogCat`, { ...data });
};
const addBlogCat = (data) => {
	return Http.post(`${ENV.API_URL}/blogCat`, data);
};

const updateBlogCat = (blogCatId, data) => {
	return Http.patch(`${ENV.API_URL}/blogCat/${blogCatId}`, {
		...data
	});
};

const getBlogCat = (blogCatId) => {
	return Http.get(`${ENV.API_URL}/blogCat/${blogCatId}`);
};

const deleteBlogCat = (blogCatId) => {
	return Http.delete(`${ENV.API_URL}/blogCat/${blogCatId}`);
};
// Blogs
const getBlogs = (lang, homePage, blogCat, treatment, limit, skip, perma, search) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (blogCat) {
		data.blogCat = blogCat;
	}
	if (treatment) {
		data.treatment = treatment;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (homePage) {
		data.homePage = homePage;
	}
	if (perma) {
		data.perma = perma;
	}
	if (search) {
		data.search = search;
	}
	return Http.get(`${ENV.API_URL}/blog`, { ...data });
};
const addBlog = (data) => {
	return Http.post(`${ENV.API_URL}/blog`, data);
};

const updateBlog = (blogId, data) => {
	return Http.patch(`${ENV.API_URL}/blog/${blogId}`, {
		...data
	});
};

const getBlog = (blogId) => {
	return Http.get(`${ENV.API_URL}/blog/${blogId}`);
};

const deleteBlog = (blogId) => {
	return Http.delete(`${ENV.API_URL}/blog/${blogId}`);
};
// HomePages
const getHomePages = (limit, skip,lang) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (lang) {
		data.lang = lang;
	}

	return Http.get(`${ENV.API_URL}/homePage`, { ...data });
};
const addHomePage = (data) => {
	return Http.post(`${ENV.API_URL}/homePage`, data);
};

const updateHomePage = (homePageId, data) => {
	return Http.patch(`${ENV.API_URL}/homePage/${homePageId}`, {
		...data
	});
};

const getHomePage = (homePageId) => {
	return Http.get(`${ENV.API_URL}/homePage/${homePageId}`);
};

const deleteHomePage = (homePageId) => {
	return Http.delete(`${ENV.API_URL}/homePage/${homePageId}`);
};

// AboutUss
const getAboutUss = (limit, skip) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/aboutUs`, { ...data });
};
const addAboutUs = (data) => {
	return Http.post(`${ENV.API_URL}/aboutUs`, data);
};

const updateAboutUs = (aboutUsId, data) => {
	return Http.patch(`${ENV.API_URL}/aboutUs/${aboutUsId}`, {
		...data
	});
};

const getAboutUs = (aboutUsId) => {
	return Http.get(`${ENV.API_URL}/aboutUs/${aboutUsId}`);
};

const deleteAboutUs = (aboutUsId) => {
	return Http.delete(`${ENV.API_URL}/aboutUs/${aboutUsId}`);
};
export default {
	sendMail,
	login,
	uploadImage,

	//BlogsPage
	getBlogsPages,
	getBlogsPage,
	addBlogsPage,
	updateBlogsPage,
	deleteBlogsPage,
	//Language
	getLanguages,
	getLanguage,
	addLanguage,
	updateLanguage,
	deleteLanguage,
	//HomePage
	getHomePages,
	getHomePage,
	addHomePage,
	updateHomePage,
	deleteHomePage,
	//General
	getGenerals,
	getGeneral,
	addGeneral,
	updateGeneral,
	deleteGeneral,
	//Translate
	getTranslates,
	getTranslate,
	addTranslate,
	updateTranslate,
	deleteTranslate,
	//AboutUs
	getAboutUss,
	getAboutUs,
	addAboutUs,
	updateAboutUs,
	deleteAboutUs,
	//ReferenceLogo
	getReferenceLogos,
	getReferenceLogo,
	addReferenceLogo,
	updateReferenceLogo,
	deleteReferenceLogo,
	//Action
	getActions,
	getAction,
	addAction,
	updateAction,
	deleteAction,
	//Faq
	getFaqs,
	getFaq,
	addFaq,
	updateFaq,
	deleteFaq,
	//Review
	getReviews,
	getReview,
	addReview,
	updateReview,
	deleteReview,
	//Staff
	getStaffs,
	getStaff,
	addStaff,
	updateStaff,
	deleteStaff,
	//TreatmentGroup
	getTreatmentGroups,
	getTreatmentGroup,
	addTreatmentGroup,
	updateTreatmentGroup,
	deleteTreatmentGroup,
	//Treatment
	getTreatments,
	getTreatment,
	getTreatmentViaPerma,
	addTreatment,
	updateTreatment,
	deleteTreatment,
	//BlogCat
	getBlogCats,
	getBlogCat,
	addBlogCat,
	updateBlogCat,
	deleteBlogCat,
	//Blog
	getBlogs,
	getBlog,
	addBlog,
	updateBlog,
	deleteBlog
};
