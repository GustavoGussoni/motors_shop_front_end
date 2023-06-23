import { Dialog } from "@headlessui/react";
import { Input } from "../Form/Input";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { iFormAnnoucement } from "./@types";
import { AnnoucementSchema } from "./annoucement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from "../../Contexts/UserContext";

interface iFormRegisterAnnouncement {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface iModel {
  id: string;
  name: string;
  brand: string;
  year: string;
  fuel: number | string;
  value: number | string;
}

export const FormRegisterAnnouncement = ({
  setOpen,
}: iFormRegisterAnnouncement) => {
  const { getCars, models, getModels, brands, postAnnouncement } =
    useContext(UserContext);

  const [image, setImage] = useState<number[]>([0, 1]);
  const [modelSelected, setModelSelected] = useState<iModel | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = useForm<iFormAnnoucement>({
    mode: "onBlur",
    resolver: zodResolver(AnnoucementSchema),
  });

  useEffect(() => {
    const init = async () => {
      await getCars();
    };

    init();
  }, []);

  const submitForm = (data: object) => {
    console.log(data);
    postAnnouncement(data).then((res) => setOpen(false));
  };

  const selectModels = (brand: string) => getModels(brand);

  const findOneModel = (modelId: string) => {
    const newModel = models.find((elem) => elem.id === modelId);

    setModelSelected(newModel);
  };

  return (
    <div className="min-h-full overflow-y-auto flex items-center justify-center px-5 py-10">
      <Dialog.Panel className=" flex flex-col gap-6 p-7 bg-white-fixed rounded-2 max-w-[520px]">
        <Dialog.Title className="relative right-2 text-heading-7 font-500">
          Criar Anúncio
        </Dialog.Title>
        <Dialog.Description className="text-body-2 font-500">
          Informações do veículo
        </Dialog.Description>
        <form
          className="flex flex-col items-center gap-6 justify-center"
          onSubmit={handleSubmit(submitForm)}
        >
          <fieldset className="w-full flex flex-col gap-y-2.5">
            <label className="text-grey-1 text-body-2" htmlFor="">
              Marca
            </label>
            <select
              id=""
              {...register("brand")}
              onChange={(e) => {
                setModelSelected({
                  id: "",
                  name: "",
                  brand: "",
                  year: "",
                  fuel: "",
                  value: "",
                });
                selectModels(e.target.value);
              }}
            >
              {brands.map((elem: string) => (
                <option value={elem}>{elem}</option>
              ))}
            </select>
          </fieldset>
          {/* <Listbox {...register("brand")} onChange={setBrandSelected}>
            <Listbox.Button>{teste}</Listbox.Button>
            <Listbox.Options>
              {teste.map((model: any) => (
                <Listbox.Option key={model.name} value={model} as="div">
                  {({ active, selected }) => (
                    <li
                      className={`${
                        active
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {selected && <CheckIcon />}
                      {model.name}
                    </li>
                  )}
                  {model.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox> */}
          {/* <MyListBox
            array={teste}
            as={Fragment}
            selected={brandSelected}
            setSelected={setBrandSelected}
            register={register("brand")}
          /> */}

          <fieldset className="w-full flex flex-col gap-y-2.5">
            <label className="text-grey-1 text-body-2" htmlFor="">
              Modelos
            </label>
            <select
              {...register("model")}
              id=""
              onChange={(e) => findOneModel(e.target.value)}
            >
              {models.map((elem: iModel) => (
                <option key={elem.id} value={elem.id}>
                  {elem.name}
                </option>
              ))}
            </select>
          </fieldset>

          {errors.model && (
            <span className="text-body-2 text-random-2">
              {errors.model.message}
            </span>
          )}

          <div className="flex gap-3">
            <div className="flex flex-col">
              <Input
                id="year"
                label="Ano"
                type="text"
                placeholder="2022"
                disabled={false}
                className="max-w-full"
                register={register("year", {
                  setValueAs: () => "2022",
                })}
                value={modelSelected?.year}
              />
              {errors?.year && (
                <span className="text-body-2 text-random-2">
                  {errors.year.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                id="fuel"
                label="Combustível"
                type="text"
                placeholder="diesel"
                disabled={false}
                className="max-w-full"
                register={register("fuel", {
                  setValueAs: () => String(3),
                })}
                value={String(modelSelected?.fuel)}
              />
              {errors?.fuel && (
                <span className="text-body-2 text-random-2">
                  {errors.fuel.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col">
              <Input
                id="kilometers"
                label="Quilometragem"
                type="text"
                placeholder="30.000"
                register={register("kilometers")}
                disabled={false}
                className="max-w-full"
              />
              {errors.kilometers && (
                <span className="text-body-2 text-random-2">
                  {errors.kilometers.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                id="color"
                label="Cor"
                type="text"
                placeholder="Branco"
                register={register("color")}
                disabled={false}
                className="max-w-full"
              />
              {errors.color && (
                <span className="text-body-2 text-random-2">
                  {errors.color.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col">
              <Input
                id="price_fipe"
                label="Preço tabela FIPE"
                type="text"
                placeholder="R$ 48.000,00"
                disabled={false}
                className="max-w-full"
                value={modelSelected?.value}
                register={register("price_fipe", {
                  setValueAs: () => String(20000),
                })}
              />
              {errors?.price_fipe && (
                <span className="text-body-2 text-random-2">
                  {errors.price_fipe.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Input
                id="price"
                label="Preço"
                type="text"
                placeholder="Ex: Nome Sobrenome"
                register={register("price")}
                disabled={false}
                className="max-w-full"
              />
              {errors.price && (
                <span className="text-body-2 text-random-2">
                  {errors.price.message}
                </span>
              )}
            </div>
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
          {errors.description && (
            <span className="text-body-2 text-random-2">
              {errors.description.message}
            </span>
          )}

          <Input
            id="cover_image"
            label="Imagem de capa"
            type="text"
            placeholder="https://image.com"
            register={register("cover_image")}
            disabled={false}
            className="max-w-full"
          />
          {errors.cover_image && (
            <span className="text-body-2 text-random-2">
              {errors.cover_image.message}
            </span>
          )}

          {image.map((elem) => (
            <React.Fragment>
              <Input
                id="image_gallery"
                key={elem}
                label={`${elem + 1}º imagem da galeria`}
                type="text"
                placeholder="https://image.com"
                register={register(`image_gallery.${elem}.image`, {
                  minLength: 1,
                })}
                disabled={false}
                className="max-w-full"
              />
              {errors.image_gallery && (
                <span className="text-body-2 text-random-2">
                  {errors.image_gallery.message}
                </span>
              )}
            </React.Fragment>
          ))}

          <Button
            text="Adicionar campo para imagem da galeria"
            size="medium"
            variant="brand1"
            onClick={() => setImage((array) => [...array, array.length])}
          ></Button>
          <div className="flex gap-3 self-end">
            <Button
              onClick={() => setOpen(false)}
              text="Cancelar"
              size="medium"
              variant="greyDisable"
            ></Button>
            <Button
              text="Criar anúncio"
              type="submit"
              size="medium"
              variant={isValid ? "brand1" : "brandDisable"}
            ></Button>
          </div>
        </form>
      </Dialog.Panel>
    </div>
  );
};
