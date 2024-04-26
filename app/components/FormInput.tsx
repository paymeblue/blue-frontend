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
    <div className="flex flex-col items-start justify-start w-full">
      <label
        htmlFor={id}
        className="text-[15px] mb-[.125rem] w-full font-medium leading-[21px]"
      >
        {label}
      </label>
      {rest.name === "message" ? (
        <Fragment>
          <textarea
            id={id}
            {...rest}
            {...register}
            style={{ height: 210, resize: "none" }}
            className="rounded w-full bg-input-field py-4 px-4 outline-0 border-[0.5px] border-transparent hover:border-primary placeholder:text-[#555] placeholder:text-sm placeholder:font-light placeholder:leading-[21px]"
          />
          {error && (
            <small className="text-[red]/80 text-xs tablet:text-[13px] mt-1 tablet:mt-1.5 text-start">
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
            className="rounded w-full h-[51px] bg-input-field py-2 px-4 border-[0.5px] border-transparent hover:border-primary outline-0 placeholder:text-[#555] placeholder:text-sm placeholder:font-light placeholder:leading-[21px]"
          />
          {error && (
            <small className="text-[red]/80 text-xs tablet:text-[13px] mt-1 tablet:mt-1.5 text-start">
              {error}
            </small>
          )}
        </Fragment>
      )}
    </div>
  );
};
export { Input };
