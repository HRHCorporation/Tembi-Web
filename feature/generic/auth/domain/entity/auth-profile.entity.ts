export type AuthProfileParams = Omit<AuthProfile, "toPlainObject">;

export default class AuthProfile {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly role: string;
  readonly basicSalary: number;
  readonly isWfa: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(params: {
    id: number;
    name: string;
    email: string;
    role: string;
    basicSalary: number;
    isWfa: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.role = params.role;
    this.basicSalary = params.basicSalary;
    this.isWfa = params.isWfa;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static fromJson(json: any): AuthProfile {
    return new AuthProfile({
      id: json.id,
      name: json.name,
      email: json.email,
      role: json.role,
      basicSalary: json.basic_salary,
      isWfa: json.is_wfa,
      createdAt: new Date(json.created_at),
      updatedAt: new Date(json.updated_at),
    });
  }
}