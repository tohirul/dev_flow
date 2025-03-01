import { Document, Schema, model, models } from 'mongoose';

export interface ITag extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdAt: Date;
  id?: string;
}

const tagSchema = new Schema<ITag>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question', default: [] }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  createdAt: { type: Date, default: Date.now },
  id: { type: String, index: true }
});

// Pre-save hook to set 'id' field based on '_id' only if it's new or modified
tagSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('_id')) {
    this.id = this._id.toString();
  }
  next();
});

// Index to improve performance when querying by name
// tagSchema.index({ name: 1 });

const Tag = models?.Tag || model<ITag>('Tag', tagSchema);

export default Tag;
