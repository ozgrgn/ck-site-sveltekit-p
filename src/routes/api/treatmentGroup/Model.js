import mongoose from 'mongoose';
import db from '$lib/db.js';

const TreatmentGroupSchema = new mongoose.Schema(
	{
		lang: String,
		name: String,
		name_BIG: String,
		groupImage: String,
		group: Boolean,
		shortDesc: String,
		order: Number,
		perma: String
	},
	{ timestamps: true }
);

export const TreatmentGroup = mongoose.model('treatmentGroup', TreatmentGroupSchema);

export default { TreatmentGroup };
