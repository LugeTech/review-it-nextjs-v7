type props = {
  uploadErrors: string[]
}
const UploadError = ({ uploadErrors }: props) => {
  return (
    <div className="mt-2">
      {uploadErrors ? uploadErrors.map((error: string, index: number) => (
        <div key={index} className="text-red-600">
          {error}
        </div>
      )) : null}
    </div>
  )
}

export default UploadError
