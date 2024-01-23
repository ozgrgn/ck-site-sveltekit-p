import mongoose from 'mongoose';
import db from '$lib/db.js';
const StaffSchema = new mongoose.Schema(
	{
		lang: String,
		fullName: String,
		image: String,
		text: String,
		order: Number

	},
	{ timestamps: true }
);

export const Staff = mongoose.model('staff', StaffSchema);

export default { Staff };

