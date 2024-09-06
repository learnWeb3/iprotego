import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Customer } from '../../customer/customer/customer.schemas';

// File
export type FileDocument = HydratedDocument<File>;

@Schema({
  timestamps: true,
})
export class File {
  @Prop({
    type: mongoose.Schema.Types.String,
    default: function genUUID() {
      return uuid();
    },
  })
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    ref: Customer.name,
  })
  customer: string;

  @Prop({
    type: mongoose.Schema.Types.String,
  })
  originalName: string;

  @Prop({
    type: mongoose.Schema.Types.String,
  })
  serverName: string;
}

const FileSchema = SchemaFactory.createForClass(File);

FileSchema.index(
  {
    serverName: 1,
  },
  { unique: true },
);

FileSchema.index({
  originalName: 1,
});

export { FileSchema };
