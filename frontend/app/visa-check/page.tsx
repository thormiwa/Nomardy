import { VisaResultPage } from "@/components/marketing/visa-result-page";

type Props = {
  searchParams?: {
    nationality?: string;
    destination?: string;
  };
};

export default function VisaCheckPage({ searchParams }: Props) {
  const nationality = searchParams?.nationality ?? "Nigeria";
  const destination = searchParams?.destination ?? "";

  return <VisaResultPage nationality={nationality} destination={destination} />;
}
