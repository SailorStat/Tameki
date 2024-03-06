import React from "react";
import localization from "@localization";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Card, CardMedia, Chip, Grid, IconButton } from "@mui/material";

interface ImageUploadProps {
  images: File[];
  /**
   * Максимальный размер изображения в мегабайтах
   */
  maxSize?: number;
  multiple?: boolean;
  onChange: (files: File[]) => void;
}

const BYTE_IN_MEGABYTE = 1024 * 1024;

const ImageUpload: React.FC<ImageUploadProps> = ({ maxSize, onChange, images, multiple }) => {
  const id = React.useId();
  const byteMaxSize = React.useMemo(() => (maxSize ? maxSize * BYTE_IN_MEGABYTE : maxSize), [maxSize]);

  const handleFileChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files: File[] = [...(event.target.files ?? [])];
      const filteredFiles = byteMaxSize ? files.filter((file) => file.size < byteMaxSize) : files;

      console.log(files);

      if (filteredFiles.length > 0) {
        onChange([...filteredFiles]);
      }
    },
    [byteMaxSize, onChange]
  );

  const handleDeleteImage = React.useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index);

      onChange(newImages);
    },
    [images, onChange]
  );

  return (
    <Grid container sx={{ gap: 2 }}>
      <Grid item>
        <input
          accept="image/*"
          id={id}
          multiple={multiple}
          style={{ display: "none" }}
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor={id}>
          <Button component="span" variant="contained">
            {"Выбрать изображения"}
          </Button>
        </label>
      </Grid>
      {maxSize && !images.length && (
        <Grid item sx={{ alignSelf: "center" }}>
          <Chip label={localization.sizeImage(maxSize)} />
        </Grid>
      )}
      {images.map((image, index) => (
        <Grid item key={image.size}>
          <Card style={{ position: "relative" }}>
            <CardMedia component="img" image={URL.createObjectURL(image)} style={{ maxHeight: 100, maxWidth: 100 }} />
            <IconButton
              style={{
                background: "lightgray",
                position: "absolute",
                right: -2,
                top: -2,
                transform: "scale(0.5)",
              }}
              onClick={() => handleDeleteImage(index)}
            >
              <ClearIcon />
            </IconButton>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageUpload;
