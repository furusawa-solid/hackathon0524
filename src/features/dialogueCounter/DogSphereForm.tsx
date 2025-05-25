import { faExclamation, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { Field, Input, Label } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FieldsetGroup } from '../../components/ui/FieldsetGroup';
import { IconButton } from '../../components/ui/IconButton';
import {
  type DogSphereForm as DogSphereFormType,
  dogSphereFormSchema,
} from '../../schemas/dogSphere';
import { useDogSphereStore } from '../../stores/dogSpheres';
import { useRandomDogImage } from '../../utils/useRandomDogImage';

export const DogSphereForm = () => {
  const { url, fetchDogImage } = useRandomDogImage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DogSphereFormType>({
    resolver: zodResolver(dogSphereFormSchema),
    defaultValues: {
      color: '#ffcc00',
      size: 1.2,
      imageUrl: url,
    },
  });
  const { addDogSphere } = useDogSphereStore();

  useEffect(() => {
    if (url) {
      reset((prev) => ({
        ...prev,
        imageUrl: url,
      }));
    }
  }, [url, reset]);

  const onSubmit = (form: DogSphereFormType) => {
    addDogSphere(form);
    reset();
  };

  return (
    <div>
      <FieldsetGroup
        legend="Big Bang Config"
        className="flex flex-col gap-5"
        legendClassName="text-lg"
      >
        <Field className="flex flex-col">
          <Label>Color</Label>
          <Input {...register('color')} type="color" />
          {errors.color && <p className="error-text">{errors.color.message}</p>}
        </Field>

        <Field className="flex flex-col">
          <Label>Size</Label>
          <Input
            {...register('size', { valueAsNumber: true })}
            type="range"
            min={0.5}
            max={3}
            step={0.1}
          />
          {errors.size && <p className="error-text">{errors.size.message}</p>}
        </Field>

        <Field className="flex flex-col gap-2">
          <IconButton
            label="Refresh"
            icon={faRefresh}
            onClick={fetchDogImage}
            className="p-1"
          />
          <img src={url} alt="dog" />
          {errors.imageUrl && (
            <p className="error-text">{errors.imageUrl.message}</p>
          )}
        </Field>

        <IconButton
          label="Big Bang"
          icon={faExclamation}
          onClick={handleSubmit(onSubmit)}
          className="p-1"
        />
      </FieldsetGroup>
    </div>
  );
};
