import { Document, Schema, model, models } from 'mongoose';

export interface IQuestion extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
  createdAt: Date;
  id?: string;
}

const questionSchema = new Schema<IQuestion>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  createdAt: { type: Date, default: Date.now },
  id: { type: String, index: true }
});

questionSchema.pre('save', function (next) {
  this.id = this._id.toString();
  next();
});

questionSchema.index({ author: 1 });
questionSchema.index({ tags: 1 });

const Question = models?.Question || model<IQuestion>('Question', questionSchema);

export default Question;
