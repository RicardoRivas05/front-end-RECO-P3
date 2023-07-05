import mongoose from 'mongoose';

interface IDatos {
  sourceId: string;
  value: number;
  dateTime: Date;
}

const DatosSchema = new mongoose.Schema({
  sourceId: String,
  value: Number,
  dateTime: Date,
});

const DatosModel = mongoose.model<IDatos>('Datos', DatosSchema);

async function getDatos() {
  const datos = await DatosModel.aggregate([
    {
      $group: {
        _id: '$sourceId',
        max_value: { $max: '$value' },
        max_date: { $max: '$dateTime' },
      },
    },
    {
      $project: {
        _id: 0,
        sourceId: '$_id',
        max_value: 1,
        max_date: 1,
      },
    },
  ]);
  return datos;
}
