import { useDropzone } from 'react-dropzone';

function FileUploadSVG() {
  return (
    <svg
      width={200}
      height={200}
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 8 48"
      viewBox="0 0 48 48"
      id="Upload"
    >
      <circle cx="20" cy="20.339" r=".75" fill="#2C9E4D" className="color000000 svgShape"></circle>
      <path
        d="M36.69946,27.16316c0,0,2.00739-11.38849,2.00854-11.39514c0.25885-1.46869-0.76147-2.92096-2.22852-3.17773
    c0,0-18.69489-3.29797-18.71094-3.30078c-1.43835-0.25378-2.93713,0.79449-3.18652,2.22852l-0.36035,2.0293
    c-0.07227,0.40723,0.19922,0.79688,0.60742,0.86914c0.4043,0.07227,0.79688-0.19922,0.86914-0.60742
    c0,0,0.3609-2.02991,0.36133-2.03223c0.12006-0.67535,0.7785-1.12335,1.4502-1.00977c0,0,18.67206,3.29309,18.7099,3.2998
    c0.64063,0.11426,1.05859,0.7207,0.94531,1.35742c-0.00293,0.01514-2.00806,11.38257-2.00806,11.38257
    c-0.07275,0.40747,0.19861,0.7965,0.60742,0.86914c0.40894,0.07231,0.79785-0.19919,0.86914-0.60742c0,0,2.00879-11.388
    2.00879-11.39514C38.98535,25.08594,37.96509,23.63367,36.49707,23.37695c0,0-18.69483-3.29797-18.71094-3.30078
    c-1.43835-0.25378-2.93713,0.79449-3.18652,2.22852l-0.36035,2.0293c-0.07227,0.40723,0.19922,0.79688,0.60742,0.86914
    c0.4043,0.07227,0.79688-0.19922,0.86914-0.60742c0,0,0.3609-2.02991,0.36133-2.03223
    c0.12006-0.67535,0.7785-1.12335,1.4502-1.00977c0,0,18.67206,3.29309,18.7099,3.2998c0.64063,0.11426,1.05859,0.7207,0.94531,1.35742
    c-0.00293,0.01514-2.00806,11.38257-2.00806,11.38257C36.89746,27.02832,36.60742,27.40625,36.69946,27.16316z"
      />
    </svg>
  );
}

interface FileDropZoneProps {
  onFileUpload: (file: File) => void;
  type: string;
}

const FileUploaderDropZone = ({ onFileUpload, type }: FileDropZoneProps) => {
  const onDrop = async (acceptedFiles: File[]) => {
    try {
      onFileUpload(acceptedFiles[0]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-2xl leading-6 font-semibold text-gray-900 mb-4">
            {type === 'file_search'
              ? 'Attach files to file search'
              : 'Attach files to code intepreter'}
          </h3>
          <div
            {...getRootProps()}
            className="mt-20 bg-white px-2 py-2.5 flex flex-col justify-center items-center mx-auto text-black cursor-pointer"
          >
            <input {...getInputProps()} />
            <FileUploadSVG />
            <h2 className="text-black text-xl font-bold">
              Drag your files here or
              <span className="text-green-500"> click to upload</span>
            </h2>
            <p className="text-[14px]">
              Information in attached files will be available to this assistant
            </p>
            <p className="text-green-400">Learn more</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploaderDropZone;
