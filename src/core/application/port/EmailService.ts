export interface EmailService {
  sendActivationEmail(to: string, body: string): Promise<void>;
}
