import { Dialog } from "@headlessui/react";
import { Input } from "../Form/Input";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { iFormAnnoucement } from "./@types";
import { AnnoucementSchema } from "./annoucement.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface iFormRegisterAnnouncement {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormRegisterAnnouncement = ({
  open,
  setOpen,
}: iFormRegisterAnnouncement) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<iFormAnnoucement>({
    mode: "onBlur",
    resolver: zodResolver(AnnoucementSchema),
  });

  const onSubmit = (data: object) => {
    console.log(data);
  };

  const [image, setImage] = useState<number[]>([0, 1]);

  return (
    <Dialog
      className="relative z-50"
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="min-h-full overflow-y-auto flex items-center justify-center p-4">
          <Dialog.Panel className=" flex flex-col gap-6 p-7 bg-white-fixed rounded-2 max-w-[520px]">
            <Dialog.Title className="relative right-2 text-heading-7 font-500">
              Criar Anúncio
            </Dialog.Title>
            <Dialog.Description className="text-body-2 font-500">
              Informações do veículo
            </Dialog.Description>
            <form
              className="flex flex-col items-center gap-5 justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                id="name_car"
                label="Marca"
                type="text"
                placeholder="Mercedes Benz"
                register={register("name_car")}
                disabled={false}
                className="max-w-full"
              />
              {errors.name_car && <span>{errors.name_car.message}</span>}
              <Input
                id="brand"
                label="Modelo"
                type="text"
                placeholder="A 200 CGI ADVANCE SEDAN"
                register={register("brand")}
                disabled={false}
                className="max-w-full"
              />
              <div className="flex gap-3">
                <Input
                  id="year"
                  label="Ano"
                  type="text"
                  placeholder="2018"
                  register={register("year")}
                  disabled={false}
                  className="max-w-full"
                />
                <Input
                  id="fuel"
                  label="Combustível"
                  type="text"
                  placeholder="2018"
                  register={register("fuel")}
                  disabled={false}
                  className="max-w-full"
                />
              </div>
              <div className="flex gap-3">
                <Input
                  id="kilometers"
                  label="Quilometragem"
                  type="text"
                  placeholder="30.000"
                  register={register("kilometers")}
                  disabled={false}
                  className="max-w-full"
                />
                <Input
                  id="color"
                  label="Cor"
                  type="text"
                  placeholder="Branco"
                  register={register("color")}
                  disabled={false}
                  className="max-w-full"
                />
              </div>
              <div className="flex gap-3">
                <Input
                  id="price_fipe"
                  label="Preço tabela FIPE"
                  type="text"
                  placeholder="R$ 48.000,00"
                  register={register("price_fipe")}
                  disabled={false}
                  className="max-w-full"
                />
                <Input
                  id="price"
                  label="Preço"
                  type="text"
                  placeholder="Ex: Nome Sobrenome"
                  register={register("price")}
                  disabled={false}
                  className="max-w-full"
                />
              </div>

              <Input
                id="description"
                label="Descrição"
                type="text"
                placeholder="Lorem Ipsun is simply ..."
                register={register("description")}
                disabled={false}
                className="max-w-full"
              />
              <Input
                id="cover_image"
                label="Imagem de capa"
                type="text"
                placeholder="https://image.com"
                register={register("cover_image")}
                disabled={false}
                className="max-w-full"
              />

              {image.map((elem) => (
                <Input
                  id="image_gallery"
                  key={elem}
                  label={`${elem + 1}º imagem da galeria`}
                  type="text"
                  placeholder="https://image.com"
                  register={register(`image_gallery.${elem}`)}
                  disabled={false}
                  className="max-w-full"
                />
              ))}

              <Button
                text="Adicionar campo para imagem da galeria"
                size="medium"
                variant="brand1"
                onClick={() => setImage((array) => [...array, array.length])}
              ></Button>
              <div className="flex gap-3">
                <Button
                  onClick={() => setOpen(false)}
                  text="Cancelar"
                  size="medium"
                  variant="greyDisable"
                ></Button>
                <Button
                  onClick={() => handleSubmit(onSubmit)}
                  text="Criar anúncio"
                  size="medium"
                  variant="brandDisable"
                ></Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
