import React from "react";
import { useForm } from "react-hook-form";

function BasicFormHook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
        firstname: ''
    }
  });

  const onSubmit = () => {
    alert("Her şey tamam");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("firstname", {
            required: "Bu alan zorunludur",
            maxLength: 20,
            minLength: 2,
            pattern: {
                value: /^[0-9]/,
                message: 'deneme'
            }
          })}
        />

        {errors?.firstname && (
            <div>
                {errors.firstname?.message}
            </div>
        )}

        <button>Gönder</button>
      </form>
    </div>
  );
}

export default BasicFormHook;
