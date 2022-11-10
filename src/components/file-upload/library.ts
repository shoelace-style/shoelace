export interface FileInfo {
  file: File;
  loading?: boolean;
  progress?: number;
  accepted?: boolean;
  warning?: string;
  xhr?: XMLHttpRequest;
}

export enum HttpMethod {
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  GET = 'GET'
}

export const hasValidExtension = (file: File, acceptedExtension: string): boolean => {
  return acceptedExtension === file.name.split('.').pop();
};

export const hasValidBaseType = (file: File, acceptedBaseType: string): boolean => {
  acceptedBaseType = acceptedBaseType.replace('/*', '');
  const fileBaseType = file.type.replace(/\/[a-z*]{0,20}$/, '');
  return acceptedBaseType === fileBaseType;
};

export const hasValidFileSize = (file: File, maxFileSize?: number): boolean => {
  if (!maxFileSize) {
    return true;
  }

  return file.size <= maxFileSize;
};

export const hasValidFileType = (file: File, accept: string): boolean => {
  if (accept === '*') {
    return true;
  }

  const acceptedTypes: string[] = accept.split(',');

  return acceptedTypes.some(acceptedType => {
    acceptedType = acceptedType.trim();
    if (acceptedType === file.type) {
      return true;
    }
    if (acceptedType.startsWith('.')) {
      return hasValidExtension(file, acceptedType.slice(1));
    }
    if (acceptedType.endsWith('/*')) {
      return hasValidBaseType(file, acceptedType);
    }
    return false;
  });
};
