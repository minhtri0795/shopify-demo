import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";
import { createContactForm } from "../../api";
import { ContactFormParams } from "../../api/types";
import TextField from "../TextField";
import Link from "next/link";

const ErrorText = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return <span className="text-[#E73502] text-sm">{children}</span>;
};

const text = {
  zh: {
    name: {
      label: "名字",
      placeholder: "請輸入名字",
      emptyError: "請輸入名字",
    },
    lastName: {
      label: "姓氏",
      placeholder: "請輸入姓氏",
    },
    email: {
      label: "Email",
      placeholder: "請輸入 Email",
      emptyError: "請輸入 Email",
      formatError: "請輸入合法的 Email 格式",
    },
    phone: {
      label: "聯絡電話",
      placeholder: "請輸入電話",
      emptyError: "請輸入電話",
      formatError: "請輸入合法的電話號碼",
    },
    remark: {
      label: "備註",
      placeholder: "請在此留言",
    },
    copyright: {
      label: "我同意並且了解滿溢茶",
      link: "隱私權政策",
      emptyError: "必須同意隱私權政策後才能送出表單",
    },
    reCAPCHA: {
      emptyError: '必須勾選 "我不是機器人"',
    },
    submit: "送出訊息",
    success: "您的表單已送出，我們將儘快為您處理",
    error: "表單發送失敗",
    confirm: "確定",
  },
  en: {
    name: {
      label: "First Name",
      placeholder: "Please enter your first name",
      emptyError: "Required",
    },
    lastName: {
      label: "Last Name",
      placeholder: "Please enter your last name",
    },
    email: {
      label: "Email ",
      placeholder: "Enter email adress",
      emptyError: "Required",
      formatError: "Please enter valid email address",
    },
    phone: {
      label: "Contact number",
      placeholder: "Enter phone number",
      emptyError: "Required",
      formatError: "Please enter valid phone number",
    },
    remark: {
      label: "Note",
      placeholder: "Please leave your message here...",
    },
    copyright: {
      label: "I agree with Muayik",
      link: "Privacy Policy",
      emptyError: "Required",
    },
    reCAPCHA: {
      emptyError: "Required, please tick the chexbox",
    },
    submit: "Submit",
    success:
      "Your message has been sent successfuly, we will contact with you soon!",
    error: "Your message is failed to be sent.",
    confirm: "confirm",
  },
};

export default function ContactForm() {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ContactFormParams & { copyright: boolean; recaptcha: string }>();

  const [submitState, setSubmitState] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const router = useRouter();
  const locale = router.locale as "zh" | "en";

  const content = text[locale];

  const onSubmit = (data: ContactFormParams) => {
    if (submitState === "idle") {
      setSubmitState("loading");
      sendContactForm(data);
    }
  };

  const sendContactForm = async (data: ContactFormParams) => {
    try {
      await createContactForm(data);

      setSubmitState("success");
      reset();
    } catch (e) {
      setSubmitState("error");
    }
  };

  return (
    <div className="container m-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-5"
      >
        <div className="col-span-12 md:col-span-6">
          <TextField
            {...register("firstName", {
              required: true,
            })}
            required
            error={!!errors.firstName}
            label={content.name.label}
            placeholder={content.name.placeholder}
            rightSideRender={
              <>
                {errors.firstName && (
                  <ErrorText>{content.name.emptyError}</ErrorText>
                )}
              </>
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TextField
            {...register("lastName")}
            label={content.lastName.label}
            placeholder={content.lastName.placeholder}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TextField
            {...register("email", {
              required: true,
              pattern:
                /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
            })}
            required
            error={!!errors.firstName}
            label={content.email.label}
            placeholder={content.email.placeholder}
            rightSideRender={
              <>
                {errors.email?.type === "required" && (
                  <ErrorText>{content.email.emptyError}</ErrorText>
                )}
                {errors.email?.type === "pattern" && (
                  <ErrorText>{content.email.formatError}</ErrorText>
                )}
              </>
            }
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TextField
            {...register("phone", {
              required: true,
              pattern: /\d{2,4}-?\d{3,4}-?\d{3,4}#?(\d+)?/,
            })}
            required
            label={content.phone.label}
            error={!!errors.firstName}
            placeholder={content.phone.placeholder}
            rightSideRender={
              <>
                {errors.phone?.type === "required" && (
                  <ErrorText>{content.phone.emptyError}</ErrorText>
                )}
                {errors.phone?.type === "pattern" && (
                  <ErrorText>{content.phone.formatError}</ErrorText>
                )}
              </>
            }
          />
        </div>
        <div className="col-span-12">
          <TextField
            {...register("remark")}
            type="textarea"
            label={content.remark.label}
            placeholder={content.remark.placeholder}
          />
        </div>
        <div className="flex gap-[15px] w-full col-span-12 items-center">
          <input
            {...register("copyright", {
              required: true,
            })}
            type="checkbox"
            className="border-primary border-2 text-white ring-primary"
          />
          <span>
            {content.copyright.label}{" "}
            <Link href={`${locale === "en" ? "/copyright" : "/zh/copyright"}`}>
              <a className="text-body text-[#78A0AA] underline">
                {content.copyright.link}
              </a>
            </Link>
          </span>
          {errors.copyright && (
            <ErrorText>{content.copyright.emptyError}</ErrorText>
          )}
        </div>
        <div className="w-full col-span-12">
          <Controller
            control={control}
            name="recaptcha"
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ""}
                onChange={(value) => onChange(value)}
              />
            )}
          />
          {errors.recaptcha && (
            <ErrorText>{content.reCAPCHA.emptyError}</ErrorText>
          )}
        </div>
        <div className="col-span-12">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className={`border border-primary text-primary px-5 py-2 text-body hover:bg-primary-light-hover active:bg-primary-light-active transition-colors ${
              submitState === "loading"
                ? "bg-opacity-20 pointer-events-none"
                : ""
            }`}
          >
            {submitState === "loading" ? (
              <ScaleLoader height={10} color="#C8B48C" />
            ) : (
              content.submit
            )}
          </button>
        </div>
      </form>
      <Transition
        appear
        show={submitState === "error" || submitState === "success"}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setSubmitState("idle")}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="text-center w-full max-w-md transform overflow-hidden bg-white p-6 align-middle shadow-xl transition-all py-12">
                  {submitState === "success" && (
                    <p className="text-body text-black">{content.success}</p>
                  )}

                  {submitState === "error" && (
                    <p className="text-body text-black">{content.error}</p>
                  )}

                  <div className="mt-4">
                    <button
                      type="button"
                      className={`px-6 py-[6px] text-white bg-primary hover:bg-primary-hover active:bg-primary-active transition-all`}
                      onClick={() => setSubmitState("idle")}
                    >
                      {content.confirm}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
