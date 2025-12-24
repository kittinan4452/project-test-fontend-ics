export interface Place {
  id: number;
  name: string;
  categories: string[];
  profile_image_url: string;
  operation_time: OperationTime[];
  images: string[];
  rating: number;
  address: string;
}

export interface OperationTime {
  day: string;
  time_open: string;
  time_close: string;
}
