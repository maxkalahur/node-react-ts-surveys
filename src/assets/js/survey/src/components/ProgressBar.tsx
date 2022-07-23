

export default function ProgressBar() {


    return (
        <div className="progress">
            {/* aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" */}
            <div className="progress-bar" role="progressbar" style={{width:'15%'}}  />
        </div>
    );
}