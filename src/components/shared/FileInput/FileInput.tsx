import React, { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropzone } from "react-dropzone";

const StyledFileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .dropzone {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    border: 1px dashed ${({ theme }) => theme.color.primary100};
    cursor: pointer;
  }
  .preview-container {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .images-preview {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: min-content;
    gap: ${({ theme }) => theme.spacing.space};
    padding: ${({ theme }) => theme.spacing.space};
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.color.white};
    overflow: auto;
  }
  .container {
    display: inline-block;
    position: relative;
    width: 100%;
    height: fit-content;
    padding: 0;
  }
  .dummy {
    margin-top: 100%;
  }
  .element {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export interface FileWithPreview extends File {
  preview?: string;
}

interface Props {
  files: FileWithPreview[];
  onChangeFiles: (files: File[]) => void;
}

const FileInput: React.FC<Props> = ({ files, onChangeFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": []
    },
    onDrop: acceptedFiles => {
      onChangeFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  useEffect(() => {
    return () =>
      files.forEach((file: FileWithPreview) =>
        URL.revokeObjectURL(file.preview ?? "")
      );
  }, [files]);

  return (
    <StyledFileInputContainer className="file-input-container">
      {files.length > 0 ? (
        <div className="preview-container">
          <div className="images-preview">
            {files.map((file: any, key: number) => (
              <div key={key} className="container">
                <div className="dummy" />
                <div className="element">
                  <img src={file.preview} alt="..." />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone" })}>
          <input name="images" {...getInputProps()} />
          <FontAwesomeIcon icon="plus" size="6x" className="plus-icon" />
        </div>
      )}
    </StyledFileInputContainer>
  );
};

export default FileInput;
