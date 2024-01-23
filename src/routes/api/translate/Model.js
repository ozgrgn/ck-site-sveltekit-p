import mongoose from 'mongoose';
import db from '$lib/db.js';
const TranslateSchema = new mongoose.Schema(
	{
		lang: String,
		treatments: String,
		faq: String,
		faq_long: String,
		blog: String,
		aboutUs: String,
		contact: String,
		years: String,
		freeConsultation: String,
		freeConsultation_BIG: String,
		yourName: String,
		yourPhone: String,
		yourMessage: String,
		yourMail: String,
		phoneRequired: String,
		nameRequired: String,
		mailRequired: String,
		send: String,
		category: String,
		category_BIG: String,
		categories: String,
		categories_BIG: String,
		lastBlogs: String,
		lastBlogs_BIG: String,
		otherTopics: String,
		services: String,
		phone: String,
		email: String,
		whatsapp: String,
		address: String,
		image: String,
		readMore: String,
		postedOn: String,
		treatment: String,
		treatment_BIG: String,
		links: String,
		mailSent:String,
		search:String,
		loadMore:String,
		all:String,
	},
	{ timestamps: true }
);

export const Translate = mongoose.model('translate', TranslateSchema);

export default { Translate };
