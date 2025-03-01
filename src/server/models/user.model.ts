import { Schema, model, models } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  _id: Schema.Types.ObjectId;
  email: string;
  password?: string;
  name: string;
  username: string;
  bio?: string;
  picture: string;
  address?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  userQuestions: Schema.Types.ObjectId[];
  joinedAt: Date;
  createdAt: Date;
  id?: string;
}

export const UserSchema = new Schema<IUser>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  clerkId: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, index: true },
  bio: { type: String },
  picture: { type: String, required: true },
  address: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  userQuestions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  joinedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  id: { type: String, index: true }
});

UserSchema.pre('save', function (next) {
  this.id = this._id.toString();
  next();
});

// Remove user's questions when user is deleted
UserSchema.pre('findOneAndDelete', async function (next) {
  const user = await this.model.findOne(this.getFilter()); // Get user to be deleted
  if (user) {
    await user.model('Question').deleteMany({ _id: { $in: user.userQuestions } });
  }
  next();
});

// UserSchema.index({ email: 1 });
// UserSchema.index({ username: 1 });
// UserSchema.index({ clerkId: 1 });

const User = models?.User || model<IUser>('User', UserSchema);
export default User;
