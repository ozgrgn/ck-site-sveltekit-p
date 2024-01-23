import mongoose from 'mongoose';
import db from '$lib/db.js';
const TreatmentSchema = new mongoose.Schema(
	{
		lang: String,
		name: String,
		name_BIG: String,
		text: String,
		treatmentThumbImage: String,
		treatmentImage:String,
		metaTitle: String,
		metaDescription: String,
		order: String,
		perma:String,
		treatmentShortDesc:String,
		treatmentGroup: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "treatmentGroup"
		},
	},
	{ timestamps: true }
);

export const Treatment = mongoose.model('treatment', TreatmentSchema);

export default { Treatment };

