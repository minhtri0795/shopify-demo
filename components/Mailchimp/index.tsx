import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const messageObject = {
  en: {
    success: "訂閱成功",
  },
  zh: {
    success: "Subscribe success!",
  },
};

export default function Mailchimp() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const locale = router.locale as "zh" | "en";

  return (
    <MailchimpSubscribe
      url={`https://muayiktea.us13.list-manage.com/subscribe/post?u=75a3af946e7ab1c7a208a53e7&amp;id=8a9d42a3bb&amp;f_id=00dcc7e2f0`}
      render={({ subscribe, status, message }) => (
        <div>
          <form
            className="inline-block h-[43px] border border-primary"
            onSubmit={handleSubmit((data) => {
              subscribe({ EMAIL: data.email });
            })}
          >
            <input
              {...register("email")}
              type="email"
              name="email"
              className="w-[264px] py-2 px-4 focus:outline-none"
              placeholder={locale === 'en' ? "Enter your email address" : "請輸入 Email"}
            />
            <input
              onClick={handleSubmit((data) => {
                subscribe({ EMAIL: data.email });
              })}
              type="submit"
              value={locale === 'en' ? "send" : "訂閱"}
              className="h-full border border-primary bg-primary text-white text-[1.125rem] px-4 cursor-pointer hover:bg-primary-hover active:bg-primary-active transition-all"
            />
          </form>

          <div className="text-left">
            {status === "sending" ? (
              <div>{status}</div>
            ) : status === "success" ? (
              <div>{messageObject[locale].success}</div>
            ) : (
              <div>{message?.toString()}</div>
            )}
          </div>
        </div>
      )}
    />
  );
}
