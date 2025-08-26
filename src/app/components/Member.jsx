
import { MdCardMembership } from "react-icons/md";
import Link from "next/link";


export default function MemberIcon() {
    return (
      <div className="memberfloat-container">
        <Link href="/Membership">
          <div className="memberfloat-icon">
            <MdCardMembership className="member-float-icon" />
            <p>M</p>
            <p>E</p>
            <p>M</p>
            <p>B</p>
            <p>E</p>
            <p>R</p>
            <p>S</p>
            <p>H</p>
            <p>I</p>
            <p>P</p>
          </div>
        </Link>
      </div>
    );
} 