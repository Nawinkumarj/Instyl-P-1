
import { MdCardMembership } from "react-icons/md";
import Link from "next/link";


export default function MemberIcon() {
    return (
      <div className="memberfloat-container">
        <Link href="/Membership">
          <div className="memberfloat-icon">
            <MdCardMembership className="member-float-icon" />
            <p>Membership</p>
          </div>
        </Link>
      </div>
    );
} 