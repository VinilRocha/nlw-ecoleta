import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi'

import './styles.css';

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {

    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acecptedFiles => {
        const file = acecptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);

        onFileUploaded(file);

    }, [onFileUploaded]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            {selectedFileUrl
                ? <img src={selectedFileUrl} alt="Point thumbnail" />
                : (
                    isDragActive ?
                        <p><FiUpload /> Solte a imagem aqui</p> :
                        <p><FiUpload /> Arraste ou clique aqui para inserir a imagem do estabelecimento</p>
                )
            }


        </div>
    )

}

export default Dropzone;