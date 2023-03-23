import { DownloadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { Divider } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import TableReport from '../components/TableReport';

const { Dragger } = Upload;

const props = {
  name: 'file.txt',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info: { file: UploadFile; fileList: UploadFile[] }) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: React.DragEvent<HTMLDivElement>) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export const Form = () => (
  <div className="site-layout-content">
    <br/>
    <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Ingreso de datos</h1>

    <Divider>Seleccione y carga el archivo en el siguiente espacio en formato .csv:</Divider>
    <br />
    <Dragger {...props} style={{ width: '50%', height: 170, margin: 'auto' }}>
      <p className="ant-upload-drag-icon">
        <DownloadOutlined />
      </p>
      <p className="ant-upload-text">Cargar el archivo .csv</p>
    </Dragger>
    <br />
    <TableReport ></TableReport>
    <br/>
  </div>
);

export default Form;
