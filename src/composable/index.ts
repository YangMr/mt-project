import { getPrescriptionPic } from '@/services/consult'
import { showImagePreview } from 'vant'
export default function useShowPrescription() {
  const showPrescription = async (id: string | number) => {
    const res = await getPrescriptionPic(id)
    if (res.data.id) {
      showImagePreview([res.data.url])
    }
  }
  return {
    showPrescription
  }
}
