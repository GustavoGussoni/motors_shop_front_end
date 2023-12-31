import * as z from "zod";

export const addressSchema = z.object({
  cep: z
    .string()
    .nonempty("CEP é obrigatório")
    .min(8, "Insira um CEP válido")
    .max(9, "Insira um CEP válido"),
  state: z
    .string()
    .max(2, "Insira um UF válido")
    .nonempty("UF do estado é obrigatório"),
  city: z
    .string()
    .max(50, "Insira um nome de cidade válido")
    .nonempty("Nome da cidade é obrigatório"),
  number: z.string().nonempty("Numero é obrigatório"),
  addOn: z.string().nullish(),
  street: z
    .string()
    .nonempty("Nome da rua é obrigatória")
    .max(255, "Insira uma rua de endereço válida"),
});

export const updateAddressSchema = addressSchema.partial();

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .nonempty("Nome é obrigatório")
      .max(150, "O maximo de character é de 150"),
    email: z
      .string()
      .nonempty("E-mail é obrigatório")
      .email("Insira um e-mail válido")
      .max(254, "O máximo de character é de 254"),
    cpf: z
      .string()
      .nonempty("CPF é obrigatório")
      .max(12, "Insira um cpf válido"),
    cellphone: z
      .string()
      .nonempty("Numero de celular é obrigatório")
      .max(11, "Insira um número de celular válido"),
    birthdate: z.string().nonempty("Data de nascimento é obrigatória"),
    description: z.string().nonempty("A descrição é obrigatória"),
    is_advertiser: z.string().nonempty("Selecione um tipo de usuário"),
    address: addressSchema,
    password: z
      .string()
      .nonempty("Senha é obrigatória")
      .min(8, "A senha deve contér no minímo 8 characters")
      .regex(/(?=.*?[A-Z])/, "É necessário ao menos uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "É necessário ao menos uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número"),
    confirmPassword: z.string().nonempty("Confirmação de senha obrigatória"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas precisam ser correspondentes",
    path: ["confirmPassword"],
  });
