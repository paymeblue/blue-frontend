import { Fragment } from "react";

type InputProps = {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  type: "text" | "email";
  register: any;
  error?: string;
};

const Input = ({ inputProps }: { inputProps: InputProps }) => {
  const { label, id, error, register, ...rest } = inputProps;
  return (
    <div className="flex flex-col items-start mb-6 justify-start w-full">
      <label
        htmlFor={id}
        className="text-[15px] mb-[.125rem] w-full font-semibold leading-[21px]"
      >
        {label}
        <span className="text-[#ff4d4f] font-normal text-[18px] font-sans ms-1">
          *
        </span>
      </label>
      {rest.name === "message" ? (
        <Fragment>
          <textarea
            id={id}
            {...rest}
            {...register}
            style={{ height: 120, resize: "none" }}
            className="rounded w-full bg-input-field py-2 px-4 outline-primary border-[0.5px] hover:border-primary"
          />
          {error && (
            <small className="text-[#b22222e6] text-xs tablet:text-sm mt-1 tablet:mt-2 text-start">
              {error}
            </small>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <input
            id={id}
            {...rest}
            {...register}
            className="rounded w-full h-[2.5rem] bg-input-field py-2 px-4 outline-primary border-[0.5px] hover:border-primary placeholder:text-[#555] placeholder:text-sm placeholder:font-light placeholder:leading-[21px]"
          />
          {error && (
            <small className="text-[#b22222e6] text-xs tablet:text-sm mt-1 tablet:mt-2 text-start">
              {error}
            </small>
          )}
        </Fragment>
      )}
    </div>
  );
};
export { Input };
