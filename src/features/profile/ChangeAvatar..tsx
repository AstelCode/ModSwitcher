/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { UpdateUserAvatarAction } from "@/core/presentation/user";
import { useUserContext } from "@/hooks/UserContext";
import { Check, Edit, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function ChangeAvatar() {
  const user = useUserContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>(
    !user?.avatar?.externalUrl ? undefined : user.avatar.externalUrl,
  );
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const handleUpload = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current?.click();
  };
  const handleClose = () => {
    setIsEdited(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  const handleAction = async (formData: FormData) => {
    const state = await UpdateUserAvatarAction(formData);
    if (state.error) {
      toast.error(state.error, {
        position: "top-center",
      });
      return;
    }

    setIsEdited(false);
  };

  const handleSubmit = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-background relative">
          <div className="w-40 h-40 rounded-full overflow-hidden relative">
            {imageSrc && (
              <img src={imageSrc} className="w-full h-full object-cover" />
            )}
            {isEdited && (
              <div
                className="w-full h-full flex items-center justify-center cursor-pointer absolute top-0 left-0 bg-card/50"
                onClick={handleUpload}
              >
                <Upload />
              </div>
            )}
          </div>
          {isEdited ? (
            <div className="absolute -right-10 top-[50%] translate-y-[-50%] w-10 gap-2 flex  flex-col">
              <Button variant="default" onClick={handleSubmit}>
                <Check size={20} />
              </Button>
              <Button variant="destructive" onClick={handleClose}>
                <X />
              </Button>
            </div>
          ) : (
            <div className="absolute -top-4 -right-4">
              <Button
                size="lg"
                className="text-base"
                onClick={() => setIsEdited(true)}
              >
                <Edit />
              </Button>
            </div>
          )}
        </div>
      </div>
      <form className="hidden" action={handleAction} ref={formRef}>
        <input
          type="file"
          onChange={handleChange}
          name="avatar"
          className="hidden"
          ref={fileInputRef}
          accept="image/*"
        />
      </form>
    </>
  );
}
