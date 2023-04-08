export interface Service {
  execute(data?: any): Promise<any>;
}